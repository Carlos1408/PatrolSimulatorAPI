/*
  Warnings:

  - You are about to drop the `combatResult` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "combatResult" DROP CONSTRAINT "combatResult_fk_patrol_fkey";

-- DropTable
DROP TABLE "combatResult";

-- CreateTable
CREATE TABLE "CombatResult" (
    "id" SERIAL NOT NULL,
    "q_enemies" INTEGER NOT NULL,
    "q_friend_deaths" INTEGER NOT NULL,
    "q_enemy_deaths" INTEGER NOT NULL,
    "totalSeconds" INTEGER NOT NULL DEFAULT 0,
    "fk_patrol" INTEGER NOT NULL,

    CONSTRAINT "CombatResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CombatResult_fk_patrol_key" ON "CombatResult"("fk_patrol");

-- AddForeignKey
ALTER TABLE "CombatResult" ADD CONSTRAINT "CombatResult_fk_patrol_fkey" FOREIGN KEY ("fk_patrol") REFERENCES "Patrol"("id") ON DELETE CASCADE ON UPDATE CASCADE;
