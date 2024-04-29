import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { PersistService } from './persist/persist.service';
import { HttpModule } from '@nestjs/axios';
import { ClassgroupsModule } from './classgroups/classgroups.module';
import { ClassgroupsService } from './classgroups/classgroups.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [HttpModule, ClassgroupsModule],
  providers: [ApiService, PersistService, ClassgroupsService, PrismaService],
  exports: [ApiService],
})
export class ApiModule {}
