import { PrismaClient } from '@prisma/client';
// api/data/energyCost/filter route: get all energy efficiency costs by LAD (local authority district)

export async function GET(request) {
  const type = request.nextUrl.searchParams.get('type');
  const prisma = new PrismaClient();

  try {
    const records = await prisma.heatingCost.findMany({
      include: {
        lad19: true
      }
    });
    let aggregatedData;
    if (type == 'dwelling') {
      aggregatedData = [];
      records.map((lad) => {
        aggregatedData.push({
          detached:
            parseFloat(lad.detached_Biomass) +
            parseFloat(lad.detached_Gas) +
            parseFloat(lad.detached_Oil) +
            parseFloat(lad.detached_Resistance),
          flats:
            parseFloat(lad.flats_Biomass) +
            parseFloat(lad.flats_Gas) +
            parseFloat(lad.flats_Oil) +
            parseFloat(lad.flats_Resistance),
          semi:
            parseFloat(lad.semi_detached_Biomass) +
            parseFloat(lad.semi_detached_Gas) +
            parseFloat(lad.semi_detached_Oil) +
            parseFloat(lad.semi_detached_Resistance),
          terraced:
            parseFloat(lad.terraced_Biomass) +
            parseFloat(lad.terraced_Gas) +
            parseFloat(lad.terraced_Oil) +
            parseFloat(lad.terraced_Resistance),
          lad19cd: lad.lad19.lad19cd,
          lad19nm: lad.lad19nm
        });
      });
    } else if (type == 'boiler') {
      aggregatedData = [];
      records.map((lad) => {
        aggregatedData.push({
          biomass:
            parseFloat(lad.detached_Biomass) +
            parseFloat(lad.flats_Biomass) +
            parseFloat(lad.semi_detached_Biomass) +
            parseFloat(lad.terraced_Biomass),
          gas:
            parseFloat(lad.flats_Gas) +
            parseFloat(lad.detached_Gas) +
            parseFloat(lad.semi_detached_Gas) +
            parseFloat(lad.terraced_Gas),
          oil:
            parseFloat(lad.detached_Oil) +
            parseFloat(lad.flats_Oil) +
            parseFloat(lad.semi_detached_Oil) +
            parseFloat(lad.terraced_Oil),
          resistance:
            parseFloat(lad.detached_Resistance) +
            parseFloat(lad.flats_Resistance) +
            parseFloat(lad.semi_detached_Resistance) +
            parseFloat(lad.terraced_Resistance),
          lad19cd: lad.lad19.lad19cd,
          lad19nm: lad.lad19nm
        });
      });
    }
    return Response.json(records);
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}