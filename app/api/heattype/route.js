import {PrismaClient} from "@prisma/client";

export async function GET() {
    const prisma = new PrismaClient();

    try {
        // Fetch data from the lsoaCoordinates table
        const coordinatesData = await prisma.lsoaCoordinates.findMany();
        // Fetch data from the heatingType table
        const heatingTypeData = await prisma.heatingType.findMany();

        // Create a mapping of geo_code to heating type data
        const heatingTypeMap = heatingTypeData.reduce((acc, row) => {
            const geo_code = row.lsoa11cd;
            acc[geo_code] = row;
            return acc;
        }, {});

        // Merge data from both tables based on geo_code
        const mergedData = coordinatesData.map((row) => {
            const geo_code = row.geo_code;
            const heatingDetail = heatingTypeMap[geo_code];

            return {
                ...row,
                ...heatingDetail,
            };
        });

        // Filter out null values and exclude specific fields
        const filteredMergedData = mergedData
            .filter((item) => item !== null)
            .map(({ geo_label_w, lsoa11cd, ...rest }) => rest);

        return Response.json(filteredMergedData);

        return Response.json(filteredMergedData);
    } catch (error) {
        console.error('Error during data retrieval:', error);
        return Response.json({ error: 'Failed to retrieve data' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}