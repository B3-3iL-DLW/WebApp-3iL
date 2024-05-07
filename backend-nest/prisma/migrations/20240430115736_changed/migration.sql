/*
  Warnings:

  - A unique constraint covering the columns `[classGroupId,activite,semaine,dateJour,creneau]` on the table `event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Event_classGroupId_activite_semaine_dateJour_key` ON `event`;

-- CreateIndex
CREATE UNIQUE INDEX `Event_classGroupId_activite_semaine_dateJour_key` ON `event`(`classGroupId`, `activite`, `semaine`, `dateJour`, `creneau`);
