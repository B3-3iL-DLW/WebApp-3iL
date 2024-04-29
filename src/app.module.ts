import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './api/users/users.module';
import { ClassGroupsModule } from './api/classgroups/classGroupsModule';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    UsersModule,
    ClassGroupsModule,
    ScheduleModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
