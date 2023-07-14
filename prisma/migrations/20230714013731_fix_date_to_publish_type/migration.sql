/*
  Warnings:

  - Changed the type of `dateToPublish` on the `publications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "publications" DROP COLUMN "dateToPublish",
ADD COLUMN     "dateToPublish" VARCHAR(13) NOT NULL;
