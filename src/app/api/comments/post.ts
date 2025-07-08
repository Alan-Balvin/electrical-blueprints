import { NextRequest, NextResponse } from 'next/server';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import dynamo from '@/lib/dynamoClient';

export async function POST(req: NextRequest) {
  const { blueprint, comment, user } = await req.json();

  const createdAt = new Date().toISOString();

  const params = {
    TableName: 'BlueprintComments',
    Item: {
      blueprint,
      createdAt,
      comment,
      user,
    },
  };

  await dynamo.send(new PutCommand(params));

  return NextResponse.json({ success: true });
}
