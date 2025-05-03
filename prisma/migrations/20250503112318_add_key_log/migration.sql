-- CreateEnum
CREATE TYPE "KeyAction" AS ENUM ('TAKEN', 'RETURNED');

-- CreateTable
CREATE TABLE "key_log" (
    "id" TEXT NOT NULL,
    "action" "KeyAction" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherId" TEXT NOT NULL,
    "cellId" TEXT NOT NULL,

    CONSTRAINT "key_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "key_log" ADD CONSTRAINT "key_log_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "key_log" ADD CONSTRAINT "key_log_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "cells"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
