/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Terms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Terms_number_key" ON "Terms"("number");
