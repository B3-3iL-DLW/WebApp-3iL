import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { PersistService } from './persist/persist.service';
import { HttpModule } from '@nestjs/axios';
import { ClassGroupsModule } from './classgroups/classGroupsModule';
import { ClassGroupService } from './classgroups/class-group.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [HttpModule, ClassGroupsModule],
  providers: [ApiService, PersistService, ClassGroupService, PrismaService],
  exports: [ApiService],
})
export class ApiModule {}
