/*
  Warnings:

  - The primary key for the `classgroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `classgroup` table. All the data in the column will be lost.
  - You are about to drop the column `classGroupId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_classGroupId_fkey`;

-- AlterTable
ALTER TABLE `classgroup` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `classGroupId`,
    ADD COLUMN `classGroupName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_classGroupName_fkey` FOREIGN KEY (`classGroupName`) REFERENCES `ClassGroup`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
