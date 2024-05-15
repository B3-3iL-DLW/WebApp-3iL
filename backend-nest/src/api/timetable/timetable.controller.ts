import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TimetableService } from './timetable.service';

/**
 * Controller for handling timetable related requests.
 */
@Controller('api/timetable')
@UseGuards(AuthGuard)
export class TimetableController {
  /**
   * @param {TimetableService} TimeTableService - The timetable service.
   */
  constructor(private TimeTableService: TimetableService) {}

  /**
   * Get events by class.
   * @param {string} name - The name of the class.
   */
  @Get(':class')
  getEventsByClass(@Param('class') name: string) {
    return this.TimeTableService.getTimetableByClassFile(name);
  }
}
