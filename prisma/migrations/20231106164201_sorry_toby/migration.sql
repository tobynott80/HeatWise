-- CreateTable
CREATE TABLE "HeatDemand" (
    "lsoa11cd" TEXT NOT NULL,
    "afterDemand" DECIMAL,
    "beforeDemand" DECIMAL,

    CONSTRAINT "data2021_pkey" PRIMARY KEY ("lsoa11cd")
);

-- CreateTable
CREATE TABLE "lsoa" (
    "lsoa11cd" TEXT NOT NULL,
    "lsoa11nm" TEXT,
    "lad17cd" TEXT,
    "lad17nm" TEXT,

    CONSTRAINT "lsoa_pkey" PRIMARY KEY ("lsoa11cd")
);

-- CreateTable
CREATE TABLE "admin" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE INDEX "lsoa__index" ON "lsoa"("lsoa11cd", "lad17cd");

-- AddForeignKey
ALTER TABLE "HeatDemand" ADD CONSTRAINT "lsoa11cd___fk" FOREIGN KEY ("lsoa11cd") REFERENCES "lsoa"("lsoa11cd") ON DELETE NO ACTION ON UPDATE NO ACTION;
