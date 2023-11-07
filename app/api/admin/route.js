import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bycrpt from 'bcryptjs';

export async function POST(request) {
  const data = await request.json();
  const { username, password } = data;
  const prisma = new PrismaClient();
  const admin = await prisma.admin.findUnique({
    where: {
      username: username
    }
  });
  let success = false;
  let correct = bycrpt.compareSync(password, admin.password);
  console.log(correct);
  console.log(password);
  console.log(admin.password);
  if (correct) {
    success = true;
  }
  return NextResponse.json({
    message: success ? 'Login successful' : 'Login failed'
  });
}
