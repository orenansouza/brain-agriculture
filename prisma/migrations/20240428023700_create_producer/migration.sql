-- CreateTable
CREATE TABLE "Producer" (
    "id" SERIAL NOT NULL,
    "cpf_cnpj" DOUBLE PRECISION NOT NULL,
    "producer_name" TEXT NOT NULL,
    "farm_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area" DOUBLE PRECISION NOT NULL,
    "cultivable_area" DOUBLE PRECISION NOT NULL,
    "vegetation_area" DOUBLE PRECISION NOT NULL,
    "cultivation_name" TEXT NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);
