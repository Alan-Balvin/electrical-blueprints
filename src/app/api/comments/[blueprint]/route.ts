import { getComments } from '@/lib/dynamoClient';
import { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: { blueprint: string } }
) {
  try {
    const { blueprint } = params;

    if (!blueprint) {
      return new Response(JSON.stringify({ error: 'Missing blueprint parameter' }), { status: 400 });
    }

    const comments = await getComments(blueprint);

    return new Response(JSON.stringify({ comments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
