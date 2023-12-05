import {PrismaClient} from "@prisma/client";

export async function GET(){
    const prisma = new PrismaClient();
    const data = await prisma.heatingType.findMany();
    console.log(data);

    const newDataStructure = data.map((row) => {
        try {
            const geo_code = row.lsoa11cd;
            const detached_Biomass = row.detached_Biomass;
            const detached_Gas = row.detached_Gas;
            const detached_Oil = row.detached_Oil;
            const detached_Resistance = row.detached_Resistance;
            const flats_Biomass = row.flats_Biomass;
            const flats_Gas = row.flats_Gas;
            const flats_Oil = row.flats_Oil;
            const flats_Resistance = row.flats_Resistance;
            const semi_detached_Biomass = row.semi_detached_Biomass;
            const semi_detached_Gas = row.semi_detached_Gas;
            const semi_detached_Oil = row.semi_detached_Oil;
            const semi_detached_Resistance = row.semi_detached_Resistance;
            const terraced_Biomass = row.terraced_Biomass;
            const terraced_Gas = row.terraced_Gas;
            const terraced_Oil = row.terraced_Oil;
            const terraced_Resistance = row.terraced_Resistance;
            return {
                geo_code,
                detached_Biomass,
                detached_Gas,
                detached_Oil,
                detached_Resistance,
                flats_Biomass,
                flats_Gas,
                flats_Oil,
                flats_Resistance,
                semi_detached_Biomass,
                semi_detached_Gas,
                semi_detached_Oil,
                semi_detached_Resistance,
                terraced_Biomass,
                terraced_Gas,
                terraced_Oil,
                terraced_Resistance,
                // Add other fields as needed
            };
        } catch (error) {
            console.error('Error during coordinate transformation:', error);
            return null; // or handle the error in an appropriate way
        }
    });

    return Response.json(newDataStructure);
}