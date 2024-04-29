-- CreateTable
CREATE TABLE `EventHours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startAt` VARCHAR(191) NOT NULL,
    `endAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creneau` INTEGER NOT NULL,
    `activite` VARCHAR(191) NOT NULL,
    `couleur` VARCHAR(191) NOT NULL,
    `horairesId` INTEGER NOT NULL,
    `salle` VARCHAR(191) NOT NULL,
    `visio` BOOLEAN NOT NULL,
    `repas` BOOLEAN NOT NULL,
    `dayScheduleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DaySchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `jour` INTEGER NOT NULL,
    `weekScheduleId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeekSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassGroup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `file` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `role` ENUM('STUDENT', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    `classGroupId` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_horairesId_fkey` FOREIGN KEY (`horairesId`) REFERENCES `EventHours`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_dayScheduleId_fkey` FOREIGN KEY (`dayScheduleId`) REFERENCES `DaySchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DaySchedule` ADD CONSTRAINT `DaySchedule_weekScheduleId_fkey` FOREIGN KEY (`weekScheduleId`) REFERENCES `WeekSchedule`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_classGroupId_fkey` FOREIGN KEY (`classGroupId`) REFERENCES `ClassGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
