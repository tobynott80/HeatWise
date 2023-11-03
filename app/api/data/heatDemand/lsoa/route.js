import { PrismaClient } from '@prisma/client';
// api/data/heatDemand/lsoa route: get all heatdemand for a specific lsoa (should only return one row) or all the lsoas in a LAD

export async function GET(request) {
  const lsoaQuery = request.nextUrl.searchParams.get('lsoa');
  const ladQuery = request.nextUrl.searchParams.get('lad');
  const prisma = new PrismaClient();

  if (!lsoaQuery) {
    if (ladQuery) {
      const heatDemandsForGivenLad = await prisma.lsoa.findMany({
        where: {
          lad17cd: ladQuery
        },
        select: {
          lsoa11cd: true,
          lsoa11nm: true,
          HeatDemands: {
            select: {
              afterDemand: true,
              beforeDemand: true
            }
          }
        }
      });
      return Response.json(heatDemandsForGivenLad);
    }
    return Response.json({ error: 'lsoa or lad must not be null' });
  }
  const data = await prisma.heatDemand.findMany({
    where: {
      lsoa11cd: lsoaQuery
    }
  });
  return Response.json(data);
}
