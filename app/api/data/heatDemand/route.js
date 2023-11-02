import { PrismaClient } from '@prisma/client';
// api/data/heatDemand/ route: get all heatdemand data by LAD (local authority district)

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const data = await prisma.lsoa.findMany({
      include: {
        heatDemands: true
      }
    });

    const aggregatedData = data.map((lsoaItem) => {
      return {
        lad17cd: lsoaItem.lad17cd,
        total_before: lsoaItem.heatDemands.reduce(
          (acc, curr) => acc + curr.beforeDemand,
          0
        ),
        total_after: lsoaItem.heatDemands.reduce(
          (acc, curr) => acc + curr.afterDemand,
          0
        )
      };
    });

    return Response.json(aggregatedData);
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}
