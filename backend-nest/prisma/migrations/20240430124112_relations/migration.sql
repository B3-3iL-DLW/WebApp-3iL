/*
  Warnings:

  - Made the column `classGroupId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_classGroupId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `classGroupId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_classGroupId_fkey` FOREIGN KEY (`classGroupId`) REFERENCES `classgroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
