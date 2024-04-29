/*
  Warnings:

  - Added the required column `classGroupId` to the `WeekSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `weekschedule` ADD COLUMN `classGroupId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `WeekSchedule` ADD CONSTRAINT `WeekSchedule_classGroupId_fkey` FOREIGN KEY (`classGroupId`) REFERENCES `ClassGroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
