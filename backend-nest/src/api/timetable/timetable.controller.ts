import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { TimetableService } from './timetable.service';

@Controller('api/timetable')
@UseGuards(AuthGuard)
export class TimetableController {
  constructor(private TimeTableService: TimetableService) {}

  @Get(':class')
  getEventsByClass(@Param('class') name: string) {
    return this.TimeTableService.getTimetableByClassFile(name);
  }
}
