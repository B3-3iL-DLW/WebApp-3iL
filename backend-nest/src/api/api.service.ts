import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { classgroup } from '@prisma/client';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) {}

  getClasses(): Observable<AxiosResponse<classgroup[]>> {
    return this.httpService.get<classgroup[]>(
      'https://api.lukasvalois.com/api/classes',
    );
  }
}
