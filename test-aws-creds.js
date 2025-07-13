import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

async function testAwsCredentials() {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  try {
    const command = new ListTablesCommand({});
    const data = await client.send(command);
    console.log("¡Credenciales válidas! Tablas DynamoDB:", data.TableNames);
  } catch (error) {
    console.error("Error con las credenciales o conexión:", error);
  }
}

testAwsCredentials();
