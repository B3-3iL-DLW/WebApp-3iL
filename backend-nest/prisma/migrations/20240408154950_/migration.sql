/*
  Warnings:

  - A unique constraint covering the columns `[file]` on the table `ClassGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ClassGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ClassGroup_file_key` ON `ClassGroup`(`file`);

-- CreateIndex
CREATE UNIQUE INDEX `ClassGroup_name_key` ON `ClassGroup`(`name`);
