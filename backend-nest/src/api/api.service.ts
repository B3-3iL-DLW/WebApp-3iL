import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ClassGroup } from '@prisma/client';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  getClasses(): Observable<AxiosResponse<ClassGroup[]>> {
    return this.httpService.get<ClassGroup[]>(
      'https://api.lukasvalois.com/api/classes',
    );
  }
}
