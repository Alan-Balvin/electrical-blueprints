import { getComments } from '@/lib/dynamoClient';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split('/');
    const blueprint = parts[parts.length - 1];

    if (!blueprint) {
      return new Response(JSON.stringify({ error: 'Missing blueprint parameter' }), { status: 400 });
    }

    const comments = await getComments(blueprint);

    return new Response(JSON.stringify({ comments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
