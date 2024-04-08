import { Module } from '@nestjs/common';
import { ClassGroupService } from './class-group.service';
import { ClassgroupsController } from './classgroups.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ClassgroupsController],
  providers: [ClassGroupService, PrismaService],
})
export class ClassGroupsModule {}
