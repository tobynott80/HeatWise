// fetchAndProcessData.js
import { PrismaClient } from '@prisma/client';
import proj4 from 'proj4';

const prisma = new PrismaClient();
const sourceProjection = 'EPSG:27700';
const targetProjection = 'EPSG:4326';

export const fetchAndProcessData = async () => {
    try {
        // Fetch data from the database
        const dbData = await prisma.lsoaCoordinates.findMany(); // Adjust with your actual table name

        // Convert coordinates and create a new data structure
        const newDataStructure = dbData.map((row) => {
            const [longitude, latitude] = proj4(sourceProjection, targetProjection, [
                row.x_coordinate,
                row.y_coordinate,
            ]);

            return {
                geo_code: row.geo_code,
                longitude,
                latitude,
                // Add other fields as needed
            };
        });

        return newDataStructure;
    } catch (error) {
        console.log('Error fetching and processing data', error);
        return [];
    } finally {
    }
};
