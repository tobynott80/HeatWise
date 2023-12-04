import { NextResponse } from 'next/server';
import { parseCSV } from '../parseCSV';
import { PrismaClient } from '@prisma/client';

export async function POST(req) {
  const prisma = new PrismaClient();

  try {
    const data = await req.formData();
    const file = data.get('file'); // Get the file from form data

    if (!file) throw new Error('No file uploaded.');

    const buffer = Buffer.from(await file.arrayBuffer());
    const csvData = await parseCSV(buffer);
    const prisma = new PrismaClient();

    const deleteColumns = await prisma.heatDemand.deleteMany({});
    console.log(`Deleted ${deleteColumns.count} rows`);

    const createMany = await prisma.heatDemand.createMany({
      data: csvData
    });
    console.log(`Created ${createMany.count} rows`);

    console.log(csvData);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
  return NextResponse.json({ message: 'File uploaded successfully' });
}
