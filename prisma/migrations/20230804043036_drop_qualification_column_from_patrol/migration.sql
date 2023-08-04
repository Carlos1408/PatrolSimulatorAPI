/*
  Warnings:

  - You are about to drop the column `qualification` on the `Patrol` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CombatResult" ADD COLUMN     "qualification" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "Patrol" DROP COLUMN "qualification";

-- AlterTable
ALTER TABLE "RecognitionResult" ADD COLUMN     "qualification" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
