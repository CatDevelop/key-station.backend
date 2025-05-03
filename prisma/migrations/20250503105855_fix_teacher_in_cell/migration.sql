-- DropForeignKey
ALTER TABLE "cells" DROP CONSTRAINT "cells_teacherId_fkey";

-- AlterTable
ALTER TABLE "cells" ALTER COLUMN "teacherId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cells" ADD CONSTRAINT "cells_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
