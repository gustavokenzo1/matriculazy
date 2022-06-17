-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classroom" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "offers" INTEGER NOT NULL,
    "occupied" INTEGER NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);
