import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { classgroup } from '@prisma/client';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

/**
 * Service for handling API requests.
 */
@Injectable()
export class ApiService {
  /**
   * @param {HttpService} httpService - The HTTP service.
   */
  constructor(private readonly httpService: HttpService) {}

  /**
   * Get all classes.
   * @returns {Observable<AxiosResponse<classgroup[]>>} An Observable that contains the response from the API.
   */
  getClasses(): Observable<AxiosResponse<classgroup[]>> {
    return this.httpService.get<classgroup[]>(
      'https://api.lukasvalois.com/api/classes',
    );
  }

  /**
   * Get timetable by class file.
   * @param {string} file - The name of the class file.
   * @returns {Observable<AxiosResponse<any>>} An Observable that contains the response from the API.
   */
  getTimetableByClassFile(file: string): Observable<AxiosResponse<any>> {
    // Encode the request parameter to avoid errors
    file = encodeURIComponent(file);
    return this.httpService.get<any>(
      `https://api.lukasvalois.com/api/timetable?class_param=${file}`,
    );
  }
}
