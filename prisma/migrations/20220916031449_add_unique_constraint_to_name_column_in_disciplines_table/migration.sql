/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Disciplines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Disciplines_name_key" ON "Disciplines"("name");
