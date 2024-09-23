import { Schema } from "../data/resource";
import { env } from "$amplify/env/getProducts";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const getCsvFromS3 = async (): Promise<string> => {
  const key = "csvs/products.csv";
  console.log({
    Bucket: env.PRODUCT_BOT_STORAGE_BUCKET_NAME,
    Key: key,
  });
  const client = new S3Client({ region: env.AWS_REGION });
  const command = new GetObjectCommand({
    Bucket: env.PRODUCT_BOT_STORAGE_BUCKET_NAME,
    Key: key,
  });
  const response = await client.send(command);
  if (!response.Body) {
    throw new Error(`Object with key ${key} not found`);
  }

  const stringResponse = await response.Body.transformToString();
  console.log({ stringResponse });
  return stringResponse;
};

export const handler: Schema["getProducts"]["functionHandler"] = async () => {
  return { value: await getCsvFromS3() };
};
