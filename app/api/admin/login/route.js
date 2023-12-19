import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bycrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies, headers } from 'next/headers';

export async function POST(request) {
  const data = await request.json();
  const { username, password } = data;
  const prisma = new PrismaClient();
  const cookieStore = cookies();

  const admin = await prisma.admin.findUnique({
    where: {
      username: username
    }
  });

  const correct = bycrpt.compareSync(password, admin.password);

  if (!correct) {
    return NextResponse.json({ token: null });
  }

  const token = jwt.sign({ userId: admin.username }, process.env.JWT_SECRET, {
    expiresIn: '5m'
  });

  cookies().set('token', token, {
    path: '/'
  });

  return NextResponse.json({ token });
}
