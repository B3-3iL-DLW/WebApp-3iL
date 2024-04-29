import { Injectable } from '@nestjs/common';
import { ApiService } from '../api.service';
import { ClassGroupService } from '../classgroups/class-group.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PersistService {
  constructor(
    private readonly apiService: ApiService,
    private readonly classGroupService: ClassGroupService,
  ) {}

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
}
