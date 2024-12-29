import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";
import { getProducts } from "./function/resource";
import * as iam from "aws-cdk-lib/aws-iam";

const BEDROCK_KNOWLEDGE_BASE_REGION = "us-west-2";
const BEDROCK_KNOWLEDGE_BASE_ID = "RPDVYMXFRH";
const backend = defineBackend({
  auth,
  data,
  storage,
  getProducts,
});
const KnowledgeBaseDataSource =
  backend.data.resources.graphqlApi.addHttpDataSource(
    "ProductKnowledgeBaseDataSource",
    `https://bedrock-agent-runtime.${BEDROCK_KNOWLEDGE_BASE_REGION}.amazonaws.com`,
    {
      authorizationConfig: {
        signingRegion: BEDROCK_KNOWLEDGE_BASE_REGION,
        signingServiceName: "bedrock",
      },
    }
  );

KnowledgeBaseDataSource.grantPrincipal.addToPrincipalPolicy(
  new iam.PolicyStatement({
    resources: [
      `arn:aws:bedrock:${BEDROCK_KNOWLEDGE_BASE_REGION}:*:knowledge-base/${BEDROCK_KNOWLEDGE_BASE_ID}`,
    ],
    actions: ["bedrock:Retrieve"],
  })
);
