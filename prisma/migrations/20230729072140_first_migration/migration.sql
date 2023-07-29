-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirmPassword" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "ffaa" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "fk_user" INTEGER NOT NULL,
    "fk_role" INTEGER NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("fk_user","fk_role")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "mapKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weather" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patrol" (
    "id" SERIAL NOT NULL,
    "patrolKey" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update" TIMESTAMP(3) NOT NULL,
    "qualification" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalSeconds" INTEGER NOT NULL DEFAULT 0,
    "fk_user" INTEGER NOT NULL,
    "fk_map" INTEGER NOT NULL,

    CONSTRAINT "Patrol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatrolTask" (
    "id" SERIAL NOT NULL,
    "taskKey" TEXT NOT NULL,
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
    "fk_patrol" INTEGER NOT NULL,

    CONSTRAINT "PatrolTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recognition" (
    "id" SERIAL NOT NULL,
    "recognitionKey" TEXT NOT NULL,
    "watchtowers" INTEGER NOT NULL,
    "tank" INTEGER NOT NULL,
    "helicopter" INTEGER NOT NULL,
    "alternativeRoute" BOOLEAN NOT NULL,
    "mortar" INTEGER NOT NULL,
    "jeep" INTEGER NOT NULL,
    "fk_patrol" INTEGER NOT NULL,

    CONSTRAINT "Recognition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecognitionResult" (
    "id" SERIAL NOT NULL,
    "resultKey" TEXT NOT NULL,
    "formationsQualification" DOUBLE PRECISION NOT NULL,
    "techniquesRecognitionsQualifications" DOUBLE PRECISION NOT NULL,
    "fk_patrol" INTEGER NOT NULL,

    CONSTRAINT "RecognitionResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatrolTask_fk_patrol_key" ON "PatrolTask"("fk_patrol");

-- CreateIndex
CREATE UNIQUE INDEX "Recognition_fk_patrol_key" ON "Recognition"("fk_patrol");

-- CreateIndex
CREATE UNIQUE INDEX "RecognitionResult_fk_patrol_key" ON "RecognitionResult"("fk_patrol");

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
