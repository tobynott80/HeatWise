import { NextResponse } from 'next/server';
import { parseCSV } from './parseCSV';

export async function POST(req, res) {
  try {
    const data = await req.formData();
    const csvData = await parseCSV(
      Buffer.from(await data.get('file').arrayBuffer())
    );

    console.log(csvData);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: 'File uploaded successfully' });
}
