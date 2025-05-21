/*
  Warnings:

  - You are about to drop the column `teacherId` on the `cells` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `key_log` table. All the data in the column will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `key_log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CustomerRole" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- DropForeignKey
ALTER TABLE "cells" DROP CONSTRAINT "cells_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "key_log" DROP CONSTRAINT "key_log_teacherId_fkey";

-- AlterTable
ALTER TABLE "cells" DROP COLUMN "teacherId",
ADD COLUMN     "customerId" TEXT;

-- AlterTable
ALTER TABLE "key_log" DROP COLUMN "teacherId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "teacher";

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rfid" TEXT NOT NULL,
    "role" "CustomerRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cells" ADD CONSTRAINT "cells_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_log" ADD CONSTRAINT "key_log_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
