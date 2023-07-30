/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `AmbushResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `CombatResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Map` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Patrol` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `PatrolTask` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Recognition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `RecognitionResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AmbushResult_id_key" ON "AmbushResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CombatResult_id_key" ON "CombatResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Map_id_key" ON "Map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Patrol_id_key" ON "Patrol"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PatrolTask_id_key" ON "PatrolTask"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recognition_id_key" ON "Recognition"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RecognitionResult_id_key" ON "RecognitionResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
