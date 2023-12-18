import { PrismaClient } from '@prisma/client';
// api/data/consumption - get heat consumtion data

export async function GET(request) {
  const prisma = new PrismaClient();
  const data = await prisma.heatDemand.findMany({
    where: {
      lsoa11cd: lsoaQuery
    }
  });
  return Response.json(data);
}
