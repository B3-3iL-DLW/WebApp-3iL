import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Service for managing timetable data.
 */
@Injectable()
export class TimetableService {
  /**
   * @param {PrismaService} prisma - The Prisma service.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new event.
   * @param {any} data - The data for the new event.
   */
  create(data: any) {
    return this.prisma.event.create({ data });
  }

  /**
   * Find all events.
   */
  async findAll() {
    return this.prisma.event.findMany();
  }

  /**
   * Remove an event by ID.
   * @param {number} id - The ID of the event to remove.
   */
  async remove(id: number) {
    return this.prisma.event.delete({ where: { id } });
  }

  /**
   * Update an event by ID.
   * @param {number} id - The ID of the event to update.
   * @param {any} data - The new data for the event.
   */
  async update(id: number, data: any) {
    return this.prisma.event.update({ where: { id }, data });
  }

  /**
   * Find an event by its composite key.
   * @param {any} data - The data for the composite key.
   */
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

  /**
   * Upsert an event.
   * @param {any} data - The data for the event.
   */
  async upsert(data: any) {
    this.findByCompositeKey(data).then((event) => {
      if (event) {
        return this.update(event.id, data);
      } else {
        return this.create(data);
      }
    });
  }

  /**
   * Get timetable by class file.
   * @param {string} name - The name of the class file.
   */
  getTimetableByClassFile(name: string) {
    return this.prisma.classgroup.findFirst({
      where: { name },
      include: {
        event: { orderBy: [{ dateJour: 'asc' }, { creneau: 'asc' }] },
      },
    });
  }
}
