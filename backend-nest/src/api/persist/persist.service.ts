import { Injectable } from '@nestjs/common';
import { ApiService } from '../api.service';
import { ClassgroupsService } from '../classgroups/classgroups.service';
import { TimetableService } from '../timetable/timetable.service';
import { Cron } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import * as console from 'node:console';
import Bottleneck from 'bottleneck';

@Injectable()
export class PersistService {
  private failedClasses: Set<string> = new Set();

  private limiter = new Bottleneck({
    maxConcurrent: 3,
    minTime: 10, // minimum time between two tasks (in milliseconds)
  });

  constructor(
    private readonly apiService: ApiService,
    private readonly classGroupService: ClassgroupsService,
    private readonly timetableService: TimetableService,
  ) {}

  @Cron('0 0 * * 0')
  persistClasses() {
    this.apiService.getClasses().subscribe((response) => {
      response.data.forEach((item) => {
        this.persistClass(item);
      });
    });
  }

  persistClass(item: any) {
    const { ...data } = item;
    this.classGroupService
      .upsert({
        where: { file: data.file }, // use a unique field to identify the record
        create: data, // data to create if the record does not exist
        update: data, // data to update if the record exists
      })
      .then()
      .catch((error) => console.error('Error persisting class:', error));
  }

  @Cron('*/1 * * * * *')
  persistEvents() {
    this.classGroupService.findAll().then((classGroups) => {
      classGroups.forEach(
        (classGroup: { name: string; id: any }, index: number) => {
          if (!this.failedClasses.has(classGroup.name)) {
            this.persistEventForClassGroup(classGroup, index);
          }
        },
      );
    });
  }

  persistEventForClassGroup(
    classGroup: { name: string; id: any },
    index: number,
  ) {
    if (this.failedClasses.has(classGroup.name)) {
      return;
    }
    setTimeout(() => {
      this.limiter
        .schedule(() => {
          if (this.failedClasses.has(classGroup.name)) {
            return Promise.resolve(); // Resolve the promise immediately if the class group has failed
          }
          return new Promise<void>((resolve) => {
            this.apiService.getTimetableByClassFile(classGroup.name).subscribe({
              next: (response: AxiosResponse<any>) => {
                this.handleTimetableResponse(response, classGroup);
                resolve();
              },
              error: (error) => {
                this.handleTimetableError(error, classGroup);
                resolve(); // Resolve the promise when an error occurs
              },
            });
          });
        })
        .then();
    }, index * 10);
  }

  handleTimetableResponse(
    response: AxiosResponse<any>,
    classGroup: { name: string; id: any },
  ) {
    response.data.forEach((item: { code: string; DaySchedule: any[] }) => {
      item.DaySchedule.forEach((daySchedule: { date: any; events: any[] }) => {
        daySchedule.events.forEach(
          (event: {
            creneau: number;
            horaire: any;
            activite: string;
            couleur: string;
            salle: string;
            visio: boolean;
            repas: boolean;
            eval: boolean;
            startAt: any;
            endAt: any;
          }) => {
            this.persistEvent(event, item, daySchedule, classGroup);
          },
        );
      });
    });
  }

  persistEvent(event: any, item: any, daySchedule: any, classGroup: any) {
    const data = {
      creneau: event.creneau,
      semaine: item.code,
      dateJour: new Date(
        new Date(daySchedule.date).setHours(0, 0, 0, 0),
      ).toISOString(),
      activite: event.activite,
      couleur: event.couleur,
      salle: event.salle,
      visio: event.visio,
      repas: event.repas,
      eval: event.eval,
      startAt: event.horaire.startAt,
      endAt: event.horaire.endAt,
      classGroupId: classGroup.id,
    };
    this.timetableService
      .upsert(data)
      .then()
      .catch((error) =>
        console.error('Error persisting event:', error.message),
      );
  }

  handleTimetableError(error: any, classGroup: any) {
    console.error(
      `Error fetching timetable for class ${classGroup.name}:`,
      error.message,
    );
    this.failedClasses.add(classGroup.name);
  }
}
