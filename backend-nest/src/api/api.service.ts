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

  getTimetableByClassFile(file: string): Observable<AxiosResponse<any>> {
    // On encode le paramètre de la requête pour éviter les erreurs
    file = encodeURIComponent(file);
    return this.httpService.get<any>(
      `https://api.lukasvalois.com/api/timetable?class_param=${file}`,
    );
  }
}
