import { Injectable } from '@nestjs/common';
import { ApiService } from '../api.service';
import { ClassgroupsService } from '../classgroups/classgroups.service';
import { TimetableService } from '../timetable/timetable.service';
import { Cron } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import * as console from 'node:console';

@Injectable()
export class PersistService {
  constructor(
    private readonly apiService: ApiService,
    private readonly classGroupService: ClassgroupsService,
    private readonly TimetableService: TimetableService,
  ) {}
  /**
   * Cron job to persist classes every 5 minutes.
   */
  @Cron('*/2 * * * *')
  persistClasses() {
    this.apiService.getClasses().subscribe((response) => {
      response.data.forEach((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = item; // ignore id from response
        this.classGroupService
          .upsert({
            where: { file: data.file }, // use a unique field to identify the record
            create: data, // data to create if the record does not exist
            update: data, // data to update if the record exists
          })
          .then((r) => console.log(r));
      });
    });
  }
  /**
   * Cron job to persist events every 10 seconds.
   */
  @Cron('*/2 * * * *')
  persistEvents() {
    this.classGroupService.findAll().then((classGroups) => {
      classGroups.forEach((classGroup: { name: string; id: any }) => {
        this.processClassGroup(classGroup);
      });
    });
  }
  /**
   * Process a class group.
   * @param {Object} classGroup - The class group to process.
   */
  processClassGroup(classGroup: { name: string; id: any }) {
    this.apiService.getTimetableByClassFile(classGroup.name).subscribe({
      next: (response: AxiosResponse<any>) => {
        this.processResponse(response, classGroup);
      },
      error: (error) => console.log(error),
      complete: () => console.info('complete'),
    });
  }
  /**
   * Process a response.
   * @param {AxiosResponse} response - The response to process.
   * @param {Object} classGroup - The class group associated with the response.
   */
  processResponse(
    response: AxiosResponse<any>,
    classGroup: { name: string; id: any },
  ) {
    response.data.forEach((item: { code: string; DaySchedule: any[] }) => {
      this.processItem(item, classGroup);
    });
  }
  /**
   * Process an item.
   * @param {Object} item - The item to process.
   * @param {Object} classGroup - The class group associated with the item.
   */
  processItem(
    item: { code: string; DaySchedule: any[] },
    classGroup: { name: string; id: any },
  ) {
    item.DaySchedule.forEach((daySchedule: { date: any; events: any[] }) => {
      this.processDaySchedule(daySchedule, item, classGroup);
    });
  }
  /**
   * Process a day schedule.
   * @param {Object} daySchedule - The day schedule to process.
   * @param {Object} item - The item associated with the day schedule.
   * @param {Object} classGroup - The class group associated with the day schedule.
   */
  processDaySchedule(
    daySchedule: { date: any; events: any[] },
    item: { code: string; DaySchedule: any[] },
    classGroup: { name: string; id: any },
  ) {
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
        this.TimetableService.upsert(data);
      },
    );
  }
}
