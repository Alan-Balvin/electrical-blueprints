import { getComments } from '@/lib/dynamoClient';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { blueprint: string } }
) {
  try {
    const { blueprint } = params;

    if (!blueprint) {
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
