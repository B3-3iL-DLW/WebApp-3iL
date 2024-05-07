/*
  Warnings:

  - A unique constraint covering the columns `[classGroupId,semaine,dateJour,creneau]` on the table `event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Event_classGroupId_semaine_dateJour_key` ON `event`(`classGroupId`, `semaine`, `dateJour`, `creneau`);
