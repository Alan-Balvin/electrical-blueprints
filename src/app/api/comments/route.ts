import { NextRequest, NextResponse } from 'next/server';
import { postComment } from '@/lib/dynamoClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('📥 Body recibido:', body);  // 👈 LOG

    const { blueprint, message } = body;

    if (!blueprint || !message) {
      console.log('🚫 Faltan datos:', { blueprint, message });  // 👈 LOG
      return NextResponse.json({ error: 'Missing blueprint or message' }, { status: 400 });
    }

    console.log('📤 Enviando a postComment:', { blueprint, message });  // 👈 LOG

    await postComment(blueprint, message);

    console.log('✅ Comentario guardado correctamente');  // 👈 LOG

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error posting comment:', error);  // 👈 LOG DETALLADO
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
