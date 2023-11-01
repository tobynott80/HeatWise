import { PrismaClient } from '@prisma/client';
// api/data/heatDemand/ route: get all heatdemand data 

export async function GET(request) {
    const prisma = new PrismaClient();
    const data = await prisma.heatDemand.findMany();
    return Response.json(data);
}