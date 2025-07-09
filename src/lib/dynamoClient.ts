// en src/lib/dynamoClient.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const dynamo = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'BlueprintComments';

export async function getComments(blueprint: string) {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'blueprint = :b',
    ExpressionAttributeValues: { ':b': blueprint },
    ScanIndexForward: false, // Más nuevos primero
  });

  const res = await dynamo.send(command);

  return (res.Items || []).map(item => ({
    message: item.message,
    createdAt: item.createdAt,
  }));
}

export async function postComment(blueprint: string, message: string) {
  const createdAt = new Date().toISOString();
  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: { blueprint, createdAt, message,  },
  });
  await dynamo.send(command);
}

export default dynamo