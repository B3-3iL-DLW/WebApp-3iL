/*
  Warnings:

  - You are about to drop the column `dayScheduleId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `horairesId` on the `event` table. All the data in the column will be lost.
  - You are about to drop the `dayschedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eventhours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `timetable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weekschedule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[classGroupId,activite,semaine,dateJour]` on the table `event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classGroupId` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateJour` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endAt` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semaine` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dayschedule` DROP FOREIGN KEY `DaySchedule_weekScheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_dayScheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_horairesId_fkey`;

-- DropForeignKey
ALTER TABLE `timetable` DROP FOREIGN KEY `Timetable_classGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_classGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `weekschedule` DROP FOREIGN KEY `WeekSchedule_timetableId_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `dayScheduleId`,
    DROP COLUMN `horairesId`,
    ADD COLUMN `classGroupId` INTEGER NOT NULL,
    ADD COLUMN `dateJour` DATETIME(3) NOT NULL,
    ADD COLUMN `endAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `semaine` VARCHAR(191) NOT NULL,
    ADD COLUMN `startAt` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `dayschedule`;

-- DropTable
DROP TABLE `eventhours`;

-- DropTable
DROP TABLE `timetable`;

-- DropTable
DROP TABLE `weekschedule`;

-- CreateIndex
CREATE INDEX `Event_classGroupId_fkey` ON `event`(`classGroupId`);

-- CreateIndex
CREATE UNIQUE INDEX `Event_classGroupId_activite_semaine_dateJour_key` ON `event`(`classGroupId`, `activite`, `semaine`, `dateJour`);
