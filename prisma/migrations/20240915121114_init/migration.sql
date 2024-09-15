-- CreateTable
CREATE TABLE "Info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last" TEXT NOT NULL,
    "buy" TEXT NOT NULL,
    "sell" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "base_unit" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);
