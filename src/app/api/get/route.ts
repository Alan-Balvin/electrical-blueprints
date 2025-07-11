import { NextRequest, NextResponse } from 'next/server';
import { getComments } from '@/lib/dynamoClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('📥 Body recibido en /api/get:', body);

    const { blueprint } = body;

    if (!blueprint) {
      console.log('🚫 Faltó el parámetro blueprint');
      return NextResponse.json({ error: 'Missing blueprint parameter' }, { status: 400 });
    }

    console.log(`🔍 Consultando comentarios para blueprint: ${blueprint}`);

    const comments = await getComments(blueprint);

    console.log(`✅ Comentarios obtenidos: ${comments.length}`);

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('❌ Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
