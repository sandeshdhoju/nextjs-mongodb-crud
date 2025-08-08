import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('user');
    const users = await db.collection('users').find({}).toArray();

    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.firstName || !body.lastName) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('user');
    const result = await db.collection('users').insertOne({
      firstName: body.firstName,
      lastName: body.lastName,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'User created', itemId: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
