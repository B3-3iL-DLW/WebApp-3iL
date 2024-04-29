/*
  Warnings:

  - The primary key for the `classgroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `classGroupName` on the `user` table. All the data in the column will be lost.
  - Added the required column `id` to the `ClassGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_classGroupName_fkey`;

-- AlterTable
ALTER TABLE `classgroup` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP COLUMN `classGroupName`,
    ADD COLUMN `classGroupId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_classGroupId_fkey` FOREIGN KEY (`classGroupId`) REFERENCES `ClassGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
