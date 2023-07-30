/*
  Warnings:

  - The primary key for the `AmbushResult` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CombatResult` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Map` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mapKey` on the `Map` table. All the data in the column will be lost.
  - The primary key for the `Patrol` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `patrolKey` on the `Patrol` table. All the data in the column will be lost.
  - The primary key for the `PatrolTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `taskKey` on the `PatrolTask` table. All the data in the column will be lost.
  - The primary key for the `Recognition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recognitionKey` on the `Recognition` table. All the data in the column will be lost.
  - The primary key for the `RecognitionResult` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resultKey` on the `RecognitionResult` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userKey` on the `User` table. All the data in the column will be lost.
  - The primary key for the `user_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AmbushResult" DROP CONSTRAINT "AmbushResult_fk_patrol_fkey";

-- DropForeignKey
ALTER TABLE "CombatResult" DROP CONSTRAINT "CombatResult_fk_patrol_fkey";

-- DropForeignKey
ALTER TABLE "Patrol" DROP CONSTRAINT "Patrol_fk_map_fkey";

-- DropForeignKey
ALTER TABLE "Patrol" DROP CONSTRAINT "Patrol_fk_user_fkey";

-- DropForeignKey
ALTER TABLE "PatrolTask" DROP CONSTRAINT "PatrolTask_fk_patrol_fkey";

-- DropForeignKey
ALTER TABLE "Recognition" DROP CONSTRAINT "Recognition_fk_patrol_fkey";

-- DropForeignKey
ALTER TABLE "RecognitionResult" DROP CONSTRAINT "RecognitionResult_fk_patrol_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_fk_role_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_fk_user_fkey";

-- AlterTable
ALTER TABLE "AmbushResult" DROP CONSTRAINT "AmbushResult_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fk_patrol" SET DATA TYPE TEXT,
ADD CONSTRAINT "AmbushResult_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AmbushResult_id_seq";

-- AlterTable
ALTER TABLE "CombatResult" DROP CONSTRAINT "CombatResult_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fk_patrol" SET DATA TYPE TEXT,
ADD CONSTRAINT "CombatResult_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CombatResult_id_seq";

-- AlterTable
ALTER TABLE "Map" DROP CONSTRAINT "Map_pkey",
DROP COLUMN "mapKey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Map_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Map_id_seq";

-- AlterTable
ALTER TABLE "Patrol" DROP CONSTRAINT "Patrol_pkey",
DROP COLUMN "patrolKey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fk_user" SET DATA TYPE TEXT,
ALTER COLUMN "fk_map" SET DATA TYPE TEXT,
ADD CONSTRAINT "Patrol_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Patrol_id_seq";

-- AlterTable
ALTER TABLE "PatrolTask" DROP CONSTRAINT "PatrolTask_pkey",
DROP COLUMN "taskKey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fk_patrol" SET DATA TYPE TEXT,
ADD CONSTRAINT "PatrolTask_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PatrolTask_id_seq";

-- AlterTable
ALTER TABLE "Recognition" DROP CONSTRAINT "Recognition_pkey",
DROP COLUMN "recognitionKey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fk_patrol" SET DATA TYPE TEXT,
ADD CONSTRAINT "Recognition_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Recognition_id_seq";

-- AlterTable
ALTER TABLE "RecognitionResult" DROP CONSTRAINT "RecognitionResult_pkey",
DROP COLUMN "resultKey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fk_patrol" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecognitionResult_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecognitionResult_id_seq";

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Role_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userKey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_pkey",
ALTER COLUMN "fk_user" SET DATA TYPE TEXT,
ALTER COLUMN "fk_role" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("fk_user", "fk_role");

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
