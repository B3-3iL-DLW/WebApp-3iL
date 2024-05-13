import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './api/users/users.module';
import { ClassgroupsModule } from './api/classgroups/classgroups.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiModule } from './api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { TimetableModule } from './api/timetable/timetable.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ClassgroupsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ApiModule,
    AuthModule,
    TimetableModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
