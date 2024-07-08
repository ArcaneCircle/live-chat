import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactHashRouter } from "@ionic/react-router";
import { useState } from "react";

import Home from "./pages/Home";
import RealTime from "./realtime";
import { User, Msg } from "./types";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact({
  mode: "ios",
});

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);

  const onPresenceChanged = (newUsers: Record<string, User>) => {
    const usersArr = Object.values(newUsers).map((user) => user as User);
    setUsers(usersArr);
  };
  const onMessagesChanged = (newMessages: Msg[]) =>
    setMessages([...newMessages]);
  const [realtime] = useState(
    () => new RealTime({ onPresenceChanged, onMessagesChanged }),
  );
  const onSendMsg = (text: string) => realtime.sendMessage(text);

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home users={users} messages={messages} onSendMsg={onSendMsg} />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;
