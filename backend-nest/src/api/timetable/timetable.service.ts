import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TimetableService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.event.create({ data });
  }

  async findAll() {
    return this.prisma.event.findMany();
  }

  async remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }

  async update(id: number, data: any) {
    return this.prisma.event.update({ where: { id }, data });
  }

  async findByCompositeKey(data: any) {
    return this.prisma.event.findFirst({
      where: {
        classGroupId: data.classGroupId,
        activite: data.activite,
        semaine: data.semaine,
        dateJour: data.dateJour,
        creneau: data.creneau,
      },
    });
  }

  async upsert(data: any) {
    this.findByCompositeKey(data).then((event) => {
      if (event) {
        return this.update(event.id, data);
      } else {
        return this.create(data);
      }
    });
  }

  getTimetableByClassFile(name: string) {
    return this.prisma.classgroup.findFirst({
      where: { name },
      include: {
        event: { orderBy: [{ dateJour: 'asc' }, { creneau: 'asc' }] },
      },
    });
  }
}
