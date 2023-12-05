import {PrismaClient} from "@prisma/client";

export async function GET(){
    const prisma = new PrismaClient();
    const data = await prisma.lsoaCoordinates.findMany();
    console.log(data);

    const newDataStructure = data.map((row) => {
        try {
            const latitude = row.x_coordinate;
            const longitude = row.y_coordinate;
            const geo_label = row.geo_label;

            return {
                geo_code: row.geo_code,
                geo_label,
                longitude,
                latitude,
                // Add other fields as needed
            };
        } catch (error) {
            console.error('Error during coordinate transformation:', error);
            return null; // or handle the error in an appropriate way
        }
    });

    return Response.json(newDataStructure);
}