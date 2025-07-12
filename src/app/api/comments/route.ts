import {  NextResponse } from 'next/server';
import { postComment } from '@/lib/dynamoClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('📥 Body recibido:', body);

    const { blueprint, message } = body;

    if (!blueprint || !message) {
      console.log('🚫 Faltan datos:', { blueprint, message });
      return NextResponse.json({ error: 'Missing blueprint or message' }, { status: 400 });
    }

    console.log('📤 Enviando a postComment:', { blueprint, message });

    await postComment(blueprint, message);

    console.log('✅ Comentario guardado correctamente');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error posting comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
