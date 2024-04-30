/*
  Warnings:

  - You are about to drop the column `classGroupId` on the `weekschedule` table. All the data in the column will be lost.
  - Added the required column `eval` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `weekschedule` DROP FOREIGN KEY `WeekSchedule_classGroupId_fkey`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `eval` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `weekschedule` DROP COLUMN `classGroupId`,
    ADD COLUMN `timetableId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Timetable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `classGroupId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WeekSchedule` ADD CONSTRAINT `WeekSchedule_timetableId_fkey` FOREIGN KEY (`timetableId`) REFERENCES `Timetable`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Timetable` ADD CONSTRAINT `Timetable_classGroupId_fkey` FOREIGN KEY (`classGroupId`) REFERENCES `ClassGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
