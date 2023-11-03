import { PrismaClient } from '@prisma/client';
// api/data/heatDemand/ route: get all heatdemand data by LAD (local authority district)

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const records = await prisma.lsoa.findMany({
      select: {
        lad17cd: true,
        HeatDemands: {
          select: {
            beforeDemand: true,
            afterDemand: true
          }
        }
      }
    });

    const aggregatedResults = records.reduce((acc, record) => {
      if (!acc[record.lad17cd]) {
        acc[record.lad17cd] = { total_before: 0, total_after: 0 };
      }

      if (record.HeatDemands) {
        acc[record.lad17cd].total_before += Number(
          record.HeatDemands.beforeDemand || 0
        );
        acc[record.lad17cd].total_after += Number(
          record.HeatDemands.afterDemand || 0
        );
      }

      return acc;
    }, {});

    return Response.json(aggregatedResults);
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}
