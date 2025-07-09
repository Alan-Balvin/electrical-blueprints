import { PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import dynamo from './dynamoClient';

const TABLE_NAME = 'BlueprintComments';

export type Comment = {
  message: string;
  createdAt: string;
};

export async function postComment(blueprint: string, message: string, user?: string) {
  const createdAt = new Date().toISOString();

  const item: Record<string, any> = {
    blueprint,
    createdAt,
    message,
  };

  if (user) item.user = user;

  const command = new PutCommand({
    TableName: TABLE_NAME,
    Item: item,
  });

  await dynamo.send(command);
}

export async function getComments(blueprint: string): Promise<Comment[]> {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: 'blueprint = :b',
    ExpressionAttributeValues: {
      ':b': blueprint,
    },
    ScanIndexForward: false,
  });

  const res = await dynamo.send(command);

  return (res.Items || []).map((item) => ({
    message: item.message,
    createdAt: item.createdAt,
  }));
}
