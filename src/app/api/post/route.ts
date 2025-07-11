import { NextRequest, NextResponse } from 'next/server';
import { postComment } from '@/lib/dynamoClient';

export async function POST(req: NextRequest) {
  try {
    const { blueprint, message } = await req.json();

    // 🚨 Revisión rápida de las claves
    console.log('🔐 AWS KEYS:', process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);

    if (!blueprint || !message) {
      return NextResponse.json({ error: 'Missing blueprint or message' }, { status: 400 });
    }

    await postComment(blueprint, message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

