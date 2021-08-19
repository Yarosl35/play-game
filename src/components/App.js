import { LeaderBoard } from "./pages/LeaderBoard/index";
import { Board } from "./layout/index";
import { StartPage } from "./layout/StartPage";
import { Login } from "./pages/Login";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Register } from "./pages/Register";
import { Players } from "./pages/Players";
import { RoomList } from "./pages/RoomList";
import { WebPanel } from "./layout/WebPanel";
import { User } from "./pages/User";
import { ResetPassword } from "./pages/ResetPassword";
import { EmailSend } from "./pages/ResetPassword/Email";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/leader-board">
            <Board>
              <LeaderBoard />
            </Board>
          </Route>
          <Route path="/players">
            <Board>
              <Players />
            </Board>
          </Route>
          <Route path="/login">
            <StartPage>
              <Login />
            </StartPage>
          </Route>
          <Route path="/register">
            <StartPage>
              <Register />
            </StartPage>
          </Route>
          <Route path="/room-list">
            <WebPanel>
              <RoomList />
            </WebPanel>
          </Route>
          <Route path="/user">
            <WebPanel>
              <User />
            </WebPanel>
          </Route>
          <Route exact path="/reset/email">
            <StartPage>
              <EmailSend />
            </StartPage>
          </Route>
          <Route path="/reset">
            <StartPage>
              <ResetPassword />
            </StartPage>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
