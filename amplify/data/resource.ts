import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { getProducts } from "../function/resource";

const schema = a.schema({
  StringType: a.customType({
    value: a.string(),
  }),
  getProducts: a
    .query()
    .arguments({ ignoreThisArgument: a.string() })
    .returns(a.ref("StringType"))
    .handler(a.handler.function(getProducts))
    .authorization((allow) => allow.authenticated()),
  chat: a.conversation({
    aiModel: a.ai.model("Claude 3 Haiku"),
    systemPrompt: `You are a sales representative. You want to help customers products relevant to their interests`,
    tools: [
      {
        query: a.ref("getProducts"),
        description: "Provides the csv of products available to purchase.",
      },
    ],
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // defaultAuthorizationMode: "iam",
    defaultAuthorizationMode: "userPool",
  },
});
