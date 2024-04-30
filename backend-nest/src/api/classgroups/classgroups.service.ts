import { Injectable } from '@nestjs/common';
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
    if (!id) {
      throw new Error('ID connot be null');
    }
    return this.prisma.classgroup.findUnique({
      where: { id },
    });
  }

  async findByFile(file: string) {
    if (!file) throw new Error('File connot be null');
    return this.prisma.classgroup.findFirst({
      where: { file },
    });
  }

  async delete(id: number) {
    if (!id) {
      throw new Error('The class does not exist');
    }
    return this.prisma.classgroup.delete({
      where: { id },
    });
  }

  async upsert(param: {
    create: Omit<classgroup, 'id'>;
    update: Omit<classgroup, 'id'>;
    where: { file: string };
  }) {
    const isExisting = await this.findByFile(param.where.file);
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
