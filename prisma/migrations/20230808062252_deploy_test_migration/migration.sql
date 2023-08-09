-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "rank" TEXT NOT NULL,
    "ffaa" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "fk_user" TEXT NOT NULL,
    "fk_role" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("fk_user","fk_role")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weather" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Recognition',

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patrol" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,
    "totalSeconds" INTEGER NOT NULL DEFAULT 0,
    "fk_user" TEXT NOT NULL,
    "fk_map" TEXT NOT NULL,

    CONSTRAINT "Patrol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatrolTask" (
    "id" TEXT NOT NULL,
    "output" BOOLEAN NOT NULL DEFAULT false,
    "pri" BOOLEAN NOT NULL DEFAULT false,
    "pc" BOOLEAN NOT NULL DEFAULT false,
    "formation" BOOLEAN NOT NULL DEFAULT false,
    "pp" BOOLEAN NOT NULL DEFAULT false,
    "px" BOOLEAN NOT NULL DEFAULT false,
    "boxPx" BOOLEAN NOT NULL DEFAULT false,
    "proPx" BOOLEAN NOT NULL DEFAULT false,
    "pro" BOOLEAN NOT NULL DEFAULT false,
    "clover" BOOLEAN NOT NULL DEFAULT false,
    "pd" BOOLEAN NOT NULL DEFAULT false,
    "target" BOOLEAN NOT NULL DEFAULT false,
    "prdo" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,
    "fk_patrol" TEXT NOT NULL,

    CONSTRAINT "PatrolTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recognition" (
    "id" TEXT NOT NULL,
    "watchtowers" INTEGER NOT NULL DEFAULT 0,
    "tank" INTEGER NOT NULL DEFAULT 0,
    "helicopter" INTEGER NOT NULL DEFAULT 0,
    "alternativeRoute" BOOLEAN NOT NULL DEFAULT false,
    "mortar" INTEGER NOT NULL DEFAULT 0,
    "jeep" INTEGER NOT NULL DEFAULT 0,
    "fk_patrol" TEXT NOT NULL,

    CONSTRAINT "Recognition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecognitionResult" (
    "id" TEXT NOT NULL,
    "formationsQualification" DOUBLE PRECISION NOT NULL,
    "techniquesRecognitionsQualifications" DOUBLE PRECISION NOT NULL,
    "qualification" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "fk_patrol" TEXT NOT NULL,

    CONSTRAINT "RecognitionResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AmbushResult" (
    "id" TEXT NOT NULL,
    "formation" TEXT NOT NULL,
    "qualification" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "fk_patrol" TEXT NOT NULL,

    CONSTRAINT "AmbushResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatResult" (
    "id" TEXT NOT NULL,
    "q_enemies" INTEGER NOT NULL,
    "q_friend_deaths" INTEGER NOT NULL,
    "q_enemy_deaths" INTEGER NOT NULL,
    "qualification" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalSeconds" INTEGER NOT NULL DEFAULT 0,
    "player_dead" BOOLEAN NOT NULL DEFAULT false,
    "fk_patrol" TEXT NOT NULL,

    CONSTRAINT "CombatResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Map_id_key" ON "Map"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Patrol_id_key" ON "Patrol"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PatrolTask_id_key" ON "PatrolTask"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PatrolTask_fk_patrol_key" ON "PatrolTask"("fk_patrol");

-- CreateIndex
CREATE UNIQUE INDEX "Recognition_id_key" ON "Recognition"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recognition_fk_patrol_key" ON "Recognition"("fk_patrol");

-- CreateIndex
CREATE UNIQUE INDEX "RecognitionResult_id_key" ON "RecognitionResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RecognitionResult_fk_patrol_key" ON "RecognitionResult"("fk_patrol");

-- CreateIndex
CREATE UNIQUE INDEX "AmbushResult_id_key" ON "AmbushResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AmbushResult_fk_patrol_key" ON "AmbushResult"("fk_patrol");

-- CreateIndex
CREATE UNIQUE INDEX "CombatResult_id_key" ON "CombatResult"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CombatResult_fk_patrol_key" ON "CombatResult"("fk_patrol");

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_fk_role_fkey" FOREIGN KEY ("fk_role") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patrol" ADD CONSTRAINT "Patrol_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patrol" ADD CONSTRAINT "Patrol_fk_map_fkey" FOREIGN KEY ("fk_map") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatrolTask" ADD CONSTRAINT "PatrolTask_fk_patrol_fkey" FOREIGN KEY ("fk_patrol") REFERENCES "Patrol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recognition" ADD CONSTRAINT "Recognition_fk_patrol_fkey" FOREIGN KEY ("fk_patrol") REFERENCES "Patrol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecognitionResult" ADD CONSTRAINT "RecognitionResult_fk_patrol_fkey" FOREIGN KEY ("fk_patrol") REFERENCES "Patrol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AmbushResult" ADD CONSTRAINT "AmbushResult_fk_patrol_fkey" FOREIGN KEY ("fk_patrol") REFERENCES "Patrol"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatResult" ADD CONSTRAINT "CombatResult_fk_patrol_fkey" FOREIGN KEY ("fk_patrol") REFERENCES "Patrol"("id") ON DELETE CASCADE ON UPDATE CASCADE;
