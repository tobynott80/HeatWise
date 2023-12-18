-- CreateTable
CREATE TABLE "gasConsumption" (
    "HeatDate" TIMESTAMP(0) NOT NULL,
    "Before_Efficiency" DECIMAL NOT NULL,
    "After_Efficiency" DECIMAL NOT NULL,
    "AverageOAT" DECIMAL NOT NULL,

    CONSTRAINT "gasConsumption_pkey" PRIMARY KEY ("HeatDate")
);
