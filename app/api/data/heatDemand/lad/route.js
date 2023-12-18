import { PrismaClient } from '@prisma/client';
// api/data/heatDemand/lad route: get all heatdemand for a specific LAD (local authority district)

export async function GET(request) {
  const ladQuery = request.nextUrl.searchParams.get('lad');
  const prisma = new PrismaClient();
  // if no lad has been specified - get all lad data
  if (!ladQuery) {
    try {
      const data = await prisma.lsoa.findMany({
        include: {
          HeatDemand: true
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
  try {
    const data = await prisma.heatDemand.aggregate({
      where: {
        lsoa: {
          lad17cd: ladQuery
        }
      },
      _sum: {
        beforeDemand: true,
        afterDemand: true
      }
    });

    return Response.json(data);
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}
