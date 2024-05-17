import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassgroupDto } from './dto/create-classgroup.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { classgroup } from '@prisma/client';

@Injectable()
export class ClassgroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createClassgroupDto: CreateClassgroupDto) {
    if (!createClassgroupDto) {
      throw new Error('Classgroup cannot be null');
    }
    return this.prisma.classgroup.create({
      data: createClassgroupDto,
    });
  }

  async createMany(createClassgroupDtos: CreateClassgroupDto[]) {
    if (!createClassgroupDtos) {
      throw new Error('Classgroup cannot be null');
    }
    return this.prisma.classgroup.createMany({
      data: createClassgroupDtos,
    });
  }

  async findAll() {
    return this.prisma.classgroup.findMany();
  }

  async findOne(id: number) {
    const existingClassgroup = await this.prisma.classgroup.findUnique({
      where: { id },
    });
    if (!existingClassgroup) {
      throw new NotFoundException('Classgroup not found');
    }
    return this.prisma.classgroup.findUnique({
      where: { id: id },
    });
  }

  async findByFile(file: string) {
    const existingClassgroup = await this.prisma.classgroup.findFirst({
      where: { file },
    });
    if (!existingClassgroup) {
      throw new NotFoundException('Classgroup not found');
    }
    return this.prisma.classgroup.findFirst({
      where: { file: file },
    });
  }

  async delete(id: number) {
    const classgroup = await this.prisma.classgroup.findUnique({
      where: { id: id },
    });

    if (!classgroup) {
      throw new Error('The class does not exist');
    }
    return this.prisma.classgroup.delete({
      where: { id: id },
    });
  }

  async upsert(param: {
    create: Omit<classgroup, 'id'>;
    update: Omit<classgroup, 'id'>;
    where: { file: string };
  }) {
    let isExisting;
    try {
      isExisting = await this.findByFile(param.where.file);
    } catch (error) {
      if (error instanceof NotFoundException) {
        isExisting = null;
      } else {
        throw error;
      }
    }

    if (isExisting) {
      return this.prisma.classgroup.update({
        where: { id: isExisting.id },
        data: param.update,
      });
    } else {
      return this.prisma.classgroup.create({
        data: param.create,
      });
    }
  }
}
