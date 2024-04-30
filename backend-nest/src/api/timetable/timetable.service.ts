import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimetableService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.timetable.findMany();
  }

  async remove(id: number) {
    return this.prisma.timetable.delete({ where: { id } });
  }
}
