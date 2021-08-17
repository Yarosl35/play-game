import { LeaderBoard } from "./leaderBoard/index";
import { Board } from "./layout/index";
import { leaderData } from "./leaderBoard/data/leaderData";
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
          <Route path="/">
            <Board>
              <LeaderBoard arrayList={leaderData[0].list} />
            </Board>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
