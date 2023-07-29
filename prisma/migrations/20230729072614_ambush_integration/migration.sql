-- CreateTable
CREATE TABLE "AmbushResult" (
    "id" SERIAL NOT NULL,
    "formation" TEXT NOT NULL,
    "qualification" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "fk_patrol" INTEGER NOT NULL,

    CONSTRAINT "AmbushResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "combatResult" (
    "id" SERIAL NOT NULL,
    "q_enemies" INTEGER NOT NULL,
    "q_friend_deaths" INTEGER NOT NULL,
    "q_enemy_deaths" INTEGER NOT NULL,
    "totalSeconds" INTEGER NOT NULL,
    "fk_patrol" INTEGER NOT NULL,

    CONSTRAINT "combatResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AmbushResult_fk_patrol_key" ON "AmbushResult"("fk_patrol");

-- CreateIndex
CREATE UNIQUE INDEX "combatResult_fk_patrol_key" ON "combatResult"("fk_patrol");

-- AddForeignKey
ALTER TABLE "AmbushResult" ADD CONSTRAINT "AmbushResult_fk_patrol_fkey" FOREIGN KEY ("fk_patrol") REFERENCES "Patrol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "combatResult" ADD CONSTRAINT "combatResult_fk_patrol_fkey" FOREIGN KEY ("fk_patrol") REFERENCES "Patrol"("id") ON DELETE CASCADE ON UPDATE CASCADE;
