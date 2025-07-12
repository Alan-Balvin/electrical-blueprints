import { getComments } from '@/lib/dynamoClient';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { blueprint: string } }) {
  try {
    const blueprint = params.blueprint;

    if (!blueprint) {
      return new Response(JSON.stringify({ error: 'Missing blueprint parameter' }), { status: 400 });
    }

    console.log(`🔍 Consultando comentarios para blueprint: ${blueprint}`);

    const comments = await getComments(blueprint);

    console.log(`✅ Comentarios obtenidos: ${comments.length}`);

    return new Response(JSON.stringify({ comments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error fetching comments:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
