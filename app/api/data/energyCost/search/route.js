import { PrismaClient } from '@prisma/client';
// api/data/energyCost/search route: get lad names for listing

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const records = await prisma.lad19.findMany({
      select: {
        lad19cd: true,
        lad19nm: true
      },
      orderBy: {
        lad19nm: 'asc'
      }
    });

    return Response.json(records);
  } catch (error) {
    console.error('Prisma error: ', error);
    return Response.json({ error: 'Something went wrong' });
  }
}
