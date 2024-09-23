import { generateClient } from "aws-amplify/data";
import { createAIHooks, AIConversation } from "@aws-amplify/ui-react-ai";
import type { Schema } from "../amplify/data/resource";
import { Card, Loader, ScrollView, Text, View } from "@aws-amplify/ui-react";
const client = generateClient<Schema>();
const { useAIConversation } = createAIHooks(client);

function ChatComponent() {
  const [
    {
      data: { messages },
      hasError,
      isLoading,
    },
    sendMessage,
  ] = useAIConversation("chat", {
    onResponse: (response) => {
      console.log({ method: "onResponse", response });
    },
  });
  console.log({ hasError });

  messages.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  return (
    <Card variation="elevated">
      <View
        paddingLeft={"large"}
        paddingRight={"large"}
        paddingBottom={messages.length ? "small" : "xxxl"}
        textAlign={"center"}
      >
        <Text fontSize={"xl"} fontWeight={"bold"}>
          🤖 ProductBot 🤖
        </Text>
        <Text fontSize={"xs"}>Find the right product for you.</Text>
        <Text fontSize={"xxs"}>(experimental)</Text>
      </View>
      <ScrollView
      width="100%"
      minHeight="50vh"
      maxHeight={"100vh"}
      autoScroll="smooth"
      >
        <AIConversation
          messages={messages}
          handleSendMessage={(content) =>
            sendMessage({
              ...content,
              aiContext: { ignoreThisArgument: "true" },
            })
          }
          variant="bubble"
          avatars={{
            user: {
              username: "Customer",
              avatar: "🥷",
            },
            ai: {
              username: "ProductBot",
              avatar: "🤖",
            },
          }}
        />
        {isLoading ? <Loader variation="linear" /> : <></>}
      </ScrollView>
    </Card>
  );
}

export default function ChatPage() {
  return <ChatComponent />;
}
