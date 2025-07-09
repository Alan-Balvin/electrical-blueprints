import { NextRequest, NextResponse } from 'next/server';
import { getComments } from '@/lib/dynamoClient';

export async function POST(req: NextRequest) {
  try {
    const { blueprint } = await req.json();

    if (!blueprint) {
      return NextResponse.json({ error: 'Missing blueprint parameter' }, { status: 400 });
    }

    const comments = await getComments(blueprint);

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
