import Talk from "talkjs";
import { useEffect, useState, useRef } from "react";

function App() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: "1",
        name: "User",
        email: "martinishu93@gmail.com",
        welcomeMessage: "Hello!",
        role: "User",
      });

      const otherUser = new Talk.User({
        id: "2",
        name: "Admin",
        email: "sharonrose9926@gmail.com",
        welcomeMessage: "Hello!",
        role: "Admin",
      });

      const session = new Talk.Session({
        appId: "tQicN0o1",
        me: currentUser,
      });

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const popup = session.createPopup();
      popup.select(conversation);
      popup.mount({ show: false });
      return () => session.destroy();
    }
  }, [talkLoaded]);
  const button = document.getElementById("btn-getInTouch");
  // button.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   popup.show();
  // });
}

export default App;
