import { LeaderBoard } from "./pages/LeaderBoard/index";
import { Login } from "./pages/Login";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Register } from "./pages/Register";
import { Players } from "./pages/Players";
import { RoomList } from "./pages/RoomList";
import { RoomOption } from "./pages/RoomOption";
import { User } from "./pages/User";
import { ResetPassword } from "./pages/ResetPassword";
import { EmailSend } from "./pages/ResetPassword/Email";
import { NewPassword } from "./pages/NewPassword";
import { PrivateRoute } from "./PrivateRouter";
import { DashBoard } from "./pages/DashBoard";
import { SocketHandler } from "./layout/socketHandler";
import React from "react";
import { PopupMessage } from './queries/PopupMessage';

function App() {
  return (
    <BrowserRouter>
      <PopupMessage />
      <SocketHandler />
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/reset/email" component={EmailSend} />
          <Route path="/reset" component={ResetPassword} />
          <Route path="/reset-password/:token" component={NewPassword} />
          <PrivateRoute path="/leader-board">
            <LeaderBoard />
          </PrivateRoute>
          <PrivateRoute path="/user">
            <User />
          </PrivateRoute>
          <PrivateRoute path="/room-list">
            <RoomList />
          </PrivateRoute>
          <PrivateRoute path="/dash-board">
            <DashBoard />
          </PrivateRoute>
          <PrivateRoute path="/room-options">
            <RoomOption />
          </PrivateRoute>
          <PrivateRoute path="/players">
            <Players />
          </PrivateRoute>
          <PrivateRoute path="/">
            <Players />
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
