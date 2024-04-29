import { Module } from '@nestjs/common';
import { ClassgroupsService } from './classgroups.service';
import { ClassgroupsController } from './classgroups.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ClassgroupsController],
  providers: [ClassgroupsService, PrismaService],
})
export class ClassgroupsModule {}
