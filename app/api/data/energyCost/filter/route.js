import { PrismaClient } from '@prisma/client';
// api/data/energyCost/filter route: get all energy efficiency costs by LAD (local authority district)

export async function GET(request) {
  const type = request.nextUrl.searchParams.get('type');
  console.log('hello!');
  const prisma = new PrismaClient();

  try {
    const records = await prisma.heatingCost.findMany({
      include: {
        lad19: true
      }
    });
    let aggregatedData = [];
    let totalData = {};
    if (type == 'dwelling') {
      records.map((lad) => {
        let detached =
          parseFloat(lad.detached_Biomass) +
          parseFloat(lad.detached_Gas) +
          parseFloat(lad.detached_Oil) +
          parseFloat(lad.detached_Resistance);
        let flats =
          parseFloat(lad.flats_Biomass) +
          parseFloat(lad.flats_Gas) +
          parseFloat(lad.flats_Oil) +
          parseFloat(lad.flats_Resistance);
        let semi =
          parseFloat(lad.semi_detached_Biomass) +
          parseFloat(lad.semi_detached_Gas) +
          parseFloat(lad.semi_detached_Oil) +
          parseFloat(lad.semi_detached_Resistance);
        let terraced =
          parseFloat(lad.terraced_Biomass) +
          parseFloat(lad.terraced_Gas) +
          parseFloat(lad.terraced_Oil) +
          parseFloat(lad.terraced_Resistance);
        aggregatedData.push({
          detached,
          flats,
          semi,
          terraced,
          lad19cd: lad.lad19.lad19cd,
          lad19nm: lad.lad19nm
        });
        if (Object.keys(totalData).length < 1) {
          // Not initialized, set to default
          totalData = {
            detached,
            flats,
            semi,
            terraced
          };
        } else {
          totalData.detached += detached;
          totalData.flats += flats;
          totalData.semi += semi;
          totalData.terraced += terraced;
        }
      });
    } else if (type == 'boiler') {
      records.map((lad) => {
        let biomass =
          parseFloat(lad.detached_Biomass) +
          parseFloat(lad.flats_Biomass) +
          parseFloat(lad.semi_detached_Biomass) +
          parseFloat(lad.terraced_Biomass);
        let gas =
          parseFloat(lad.flats_Gas) +
          parseFloat(lad.detached_Gas) +
          parseFloat(lad.semi_detached_Gas) +
          parseFloat(lad.terraced_Gas);
        let oil =
          parseFloat(lad.detached_Oil) +
          parseFloat(lad.flats_Oil) +
          parseFloat(lad.semi_detached_Oil) +
          parseFloat(lad.terraced_Oil);
        let resistance =
          parseFloat(lad.detached_Resistance) +
          parseFloat(lad.flats_Resistance) +
          parseFloat(lad.semi_detached_Resistance) +
          parseFloat(lad.terraced_Resistance);
        aggregatedData.push({
          biomass,
          gas,
          oil,
          resistance,
          lad19cd: lad.lad19.lad19cd,
          lad19nm: lad.lad19nm
        });
        if (Object.keys(totalData).length < 1) {
          // Not initialized, set to default
          totalData = {
            biomass,
            gas,
            oil,
            resistance
          };
        } else {
          totalData.biomass += biomass;
          totalData.gas += gas;
          totalData.oil += oil;
          totalData.resistance += resistance;
        }
      });
    }
    return Response.json({ total: totalData, aggregate: aggregatedData });
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}
