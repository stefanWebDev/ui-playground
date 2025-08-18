/*
  Warnings:

  - Changed the type of `value_type` on the `Sensor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."ValueType" AS ENUM ('Analog', 'Digital');

-- AlterTable
ALTER TABLE "public"."Sensor" DROP COLUMN "value_type",
ADD COLUMN     "value_type" "public"."ValueType" NOT NULL;
