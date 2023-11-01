import { PrismaClient } from '@prisma/client';
// api/data/heatDemand/lsoa route: get all heatdemand for a specific lsoa (should only return one row)

export async function GET(request) {
  const lsoaQuery = request.nextUrl.searchParams.get('lsoa');
  console.log(lsoaQuery);
  if (!lsoaQuery) {
    return Response.json({ error: 'lsoa must not be null' });
  }
  const prisma = new PrismaClient();
  const data = await prisma.heatDemand.findMany({
    where: {
      lsoa11cd: lsoaQuery
    }
  });
  return Response.json(data);
}
