import { db } from '@/lib/db';
import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, username, password } = body;
  const userExistWithEmail = await db.user.findUnique({
    where: { email: email },
  });
  if (userExistWithEmail) {
    return NextResponse.json(
      {
        user: null,
        message: 'User with this email already exists',
      },
      { status: 409 }
    );
  }
  const userExistWithUsername = await db.user.findUnique({
    where: { username: username },
  });

  if (userExistWithUsername) {
    return NextResponse.json(
      {
        user: null,
        message: 'User with this username already exists',
      },
      { status: 409 }
    );
  }
  const hashedPassowrd = await hash(password, 10);
  const newUser = await db.user.create({
    data: {
      username,
      email,
      password: hashedPassowrd,
    },
  });

  const { password: newUserPassword, ...rest } = newUser;
  return NextResponse.json(
    { user: rest, message: 'User created' },
    { status: 201 }
  );
}
