-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_classGroupId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `classGroupId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_classGroupId_fkey` FOREIGN KEY (`classGroupId`) REFERENCES `classgroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
