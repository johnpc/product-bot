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
  chat: a
    .conversation({
      aiModel: a.ai.model("Claude 3.5 Sonnet v2"),
      systemPrompt: `You are a sales representative. You want to help customers products relevant to their interests`,
      tools: [
        a.ai.dataTool({
          name: "ProductKnowledgeBase",
          description:
            "A knowledge base to be checked about everything related to the products.",
          query: a.ref("searchProducts"),
        }),
      ],
    })
    .authorization((allow) => allow.owner()),
  searchProducts: a
    .query()
    .arguments({ input: a.string() })
    .handler(
      a.handler.custom({
        dataSource: "ProductKnowledgeBaseDataSource",
        entry: "./bedrockresolver.js",
      })
    )
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // defaultAuthorizationMode: "iam",
    defaultAuthorizationMode: "userPool",
  },
});
