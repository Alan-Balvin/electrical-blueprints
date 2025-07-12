import { postComment } from '@/lib/dynamoClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { blueprint, message } = body;

    if (!blueprint || !message) {
      return new Response(JSON.stringify({ error: 'Missing blueprint or message' }), { status: 400 });
    }

    await postComment(blueprint, message);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error posting comment:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
