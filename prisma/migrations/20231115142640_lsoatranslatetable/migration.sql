-- CreateTable
CREATE TABLE "lsoaCoordinates" (
    "geo_code" TEXT NOT NULL,
    "geo_label" TEXT NOT NULL,
    "geo_label_w" TEXT NOT NULL,
    "x_coordinate" DECIMAL(65,30) NOT NULL,
    "y_coordinate" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "lsoaCoordinates_pkey" PRIMARY KEY ("geo_code")
);
