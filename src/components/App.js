import { LeaderBoard } from "./pages/leaderBoard/index";
import { Board } from "./layout/index";
import { StartPage } from "./layout/StartPage";
import { Login } from "./pages/Login";
import { leaderData } from "./pages/leaderBoard/data/leaderData";
import { Switch, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/leader-board">
            <Board>
              <LeaderBoard arrayList={leaderData[0].list} />
            </Board>
          </Route>
          <Route path="/Login">
            <StartPage>
              <Login />
            </StartPage>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
