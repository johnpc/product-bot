import { defineStorage } from "@aws-amplify/backend";
import { getProducts } from "../function/resource";

export const storage = defineStorage({
  name: "productBotStorage",
  access: (allow) => ({
    "csvs/*": [allow.resource(getProducts).to(["read", "write"])],
  }),
});
