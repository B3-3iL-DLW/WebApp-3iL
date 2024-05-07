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

  @Cron('*/5 * * * *')
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

  @Cron('*/10 * * * * *')
  persistEvents() {
    this.classGroupService.findAll().then((classGroups) => {
      classGroups.forEach((classGroup: { name: string; id: any }) => {
        this.apiService.getTimetableByClassFile(classGroup.name).subscribe({
          next: (response: AxiosResponse<any>) => {
            response.data.forEach(
              (item: { code: string; DaySchedule: any[] }) => {
                item.DaySchedule.forEach(
                  (daySchedule: { date: any; events: any[] }) => {
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
                  },
                );
              },
            );
          },
          error: (error) => console.log(error),
          complete: () => console.info('complete'),
        });
      });
    });
  }
}
