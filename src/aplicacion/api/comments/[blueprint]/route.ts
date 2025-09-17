// src/app/api/comments/[blueprint]/route.ts
import { getComments } from '@/lib/dynamoClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split('/');
    const blueprint = parts[parts.length - 1]; // última parte de la ruta

    if (!blueprint) {
      return NextResponse.json({ error: 'Missing blueprint parameter' }, { status: 400 });
    }

    const comments = await getComments(blueprint);

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
