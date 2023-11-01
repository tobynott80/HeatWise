import { PrismaClient } from '@prisma/client';
// api/data/heatDemand/lad route: get all heatdemand for a specific LAD (local authority district)

export async function GET(request) {
  const ladQuery = request.nextUrl.searchParams.get('lad');
  console.log(ladQuery);

  if (!ladQuery) {
    return Response.json({ error: 'LAD must not be null' });
  }

  const prisma = new PrismaClient();

  try {
    const data = await prisma.lsoa.findMany({
      where: {
        lad17cd: ladQuery
      },
      include: {
        heatDemands: true
      }
    });
    return Response.json(data);
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}
