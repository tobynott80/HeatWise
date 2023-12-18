import { PrismaClient } from '@prisma/client';
// api/data/energyCost/ route: get all energy efficiency costs by LAD (local authority district)

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const records = await prisma.lad19.findMany({
      select: {
        lad19cd: true,
        HeatingCost: true
      }
    });

    return Response.json(records);
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}
