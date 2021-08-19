import { LeaderBoard } from "./pages/leaderBoard/index";
import { Board } from "./layout/index";
import { StartPage } from "./layout/StartPage";
import { Login } from "./pages/Login";
import { leaderData } from "./pages/leaderBoard/data/leaderData";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Register } from "./pages/Register";
import { Players } from "./pages/Players";

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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
