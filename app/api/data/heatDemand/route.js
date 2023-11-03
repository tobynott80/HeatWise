import { PrismaClient } from '@prisma/client';
// api/data/heatDemand/ route: get all heatdemand data by LAD (local authority district)

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const results = await prisma.lsoa.findMany({
      select: {
        lad17cd: true,
        heatDemands: {
          select: {
            beforeDemand: true,
            afterDemand: true
          }
        }
      }
    });

    // Aggregating the data
    const aggregatedData = results.reduce((acc, current) => {
      if (!acc[current.lad17cd]) {
        acc[current.lad17cd] = {
          total_before: 0,
          total_after: 0
        };
      }

      acc[current.lad17cd].total_before +=
        current.heatDemands?.beforeDemand || 0;
      acc[current.lad17cd].total_after += current.heatDemands?.afterDemand || 0;

      return acc;
    }, {});

    return Response.json(aggregatedData);

    return Response.json(ladAggregatedData);
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}
