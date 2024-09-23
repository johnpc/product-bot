import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import config from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(config);

import ChatPage from "./ChatPage";
import { useEffect } from "react";
import { signIn } from "aws-amplify/auth";

function App() {
  return (
    <>
      <ChatPage />
    </>
  );
}

export default withAuthenticator(App, {
  components: {
    Header() {
      useEffect(() => {
        const setup = async () => {
          try {
            const signInResponse = await signIn({
              username: "john+productbot@johncorser.com",
              password: "Pr0duct$b0t",
            });
            console.log({ signInResponse });
            window.location.href = "/";
          } catch (e) {
            console.error("Not signing in");
            console.error(e);
          }
        };
        setup();
      }, []);
      return <></>;
    },
  },
});
