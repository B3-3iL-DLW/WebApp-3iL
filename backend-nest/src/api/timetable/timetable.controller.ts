import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/timetable')
@UseGuards(AuthGuard)
export class TimetableController {}
