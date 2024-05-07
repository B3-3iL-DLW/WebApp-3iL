import { Module } from '@nestjs/common';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TimetableController],
  providers: [TimetableService, PrismaService],
})
export class TimetableModule {}
