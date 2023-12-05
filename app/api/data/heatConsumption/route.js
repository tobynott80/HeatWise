import { PrismaClient } from '@prisma/client';
// api/data/heatConsumption - get heat consumtion data

export async function GET(request) {
  const prisma = new PrismaClient();
  const data = await prisma.gasConsumption.findMany();
  return Response.json(data);
}
