import { defineFunction } from "@aws-amplify/backend";

export const getProducts = defineFunction({
  name: "getProducts",
  entry: "./getProducts.ts",
});
