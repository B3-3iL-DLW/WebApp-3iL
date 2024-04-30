-- DropIndex
DROP INDEX `Event_classGroupId_fkey` ON `event`;

-- AddForeignKey
ALTER TABLE `event` ADD CONSTRAINT `event_classGroupId_fkey` FOREIGN KEY (`classGroupId`) REFERENCES `classgroup`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
