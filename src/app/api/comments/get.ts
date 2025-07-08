import { NextRequest, NextResponse } from 'next/server';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import dynamo from '@/lib/dynamoClient';

export async function POST(req: NextRequest) {
  const { blueprint } = await req.json();

  const params = {
    TableName: 'BlueprintComments',
    KeyConditionExpression: 'blueprint = :b',
    ExpressionAttributeValues: {
      ':b': blueprint,
    },
  };

  const data = await dynamo.send(new QueryCommand(params));

  return NextResponse.json({ comments: data.Items });
}
