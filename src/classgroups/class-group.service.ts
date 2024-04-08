import { Injectable } from '@nestjs/common';
import { CreateClassgroupDto } from './dto/create-classgroup.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ClassGroup } from '@prisma/client';

@Injectable()
export class ClassGroupService {
  constructor(private prisma: PrismaService) {}

  async create(createClassgroupDto: CreateClassgroupDto) {
    return this.prisma.classGroup.create({
      data: createClassgroupDto,
    });
  }

  async createMany(createClassgroupDtos: CreateClassgroupDto[]) {
    return this.prisma.classGroup.createMany({
      data: createClassgroupDtos,
    });
  }

  async findAll() {
    return this.prisma.classGroup.findMany();
  }

  async findOne(id: number) {
    return this.prisma.classGroup.findUnique({
      where: { id },
    });
  }

  async findByFile(file: string) {
    return this.prisma.classGroup.findFirst({
      where: { file },
    });
  }

  async delete(id: number) {
    return this.prisma.classGroup.delete({
      where: { id },
    });
  }

  async upsert(param: {
    create: Omit<ClassGroup, 'id'>;
    update: Omit<ClassGroup, 'id'>;
    where: { file: string };
  }) {
    const isExisting = await this.findByFile(param.where.file);
    if (isExisting) {
      return this.prisma.classGroup.update({
        where: { id: isExisting.id },
        data: param.update,
      });
    } else {
      return this.prisma.classGroup.create({
        data: param.create,
      });
    }
  }
}
