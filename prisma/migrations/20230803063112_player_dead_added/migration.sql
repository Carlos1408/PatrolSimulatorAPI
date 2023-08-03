-- AlterTable
ALTER TABLE "CombatResult" ADD COLUMN     "player_dead" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Recognition" ALTER COLUMN "watchtowers" SET DEFAULT 0,
ALTER COLUMN "tank" SET DEFAULT 0,
ALTER COLUMN "helicopter" SET DEFAULT 0,
ALTER COLUMN "alternativeRoute" SET DEFAULT false,
ALTER COLUMN "mortar" SET DEFAULT 0,
ALTER COLUMN "jeep" SET DEFAULT 0;
