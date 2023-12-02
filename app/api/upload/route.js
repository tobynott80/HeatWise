import { NextResponse } from 'next/server';

export async function POST(req, res) {
  try {
    const data = await req.formData();
    const file = data.get('file');
    console.log(file);
    console.log('CSV Stored');

    try {
      // Use Prisma to interact with the database
      clearOldData(prisma);
      console.log('Old data cleared');
      createTable(prisma);
      insertData(prisma, data);
      NextResponse.json({
        message: 'File uploaded successfully + database updated'
      });
    } catch (error) {
      NextResponse.json({ message: 'internal server error' });
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: 'File uploaded successfully' });
}
