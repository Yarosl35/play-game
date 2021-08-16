import { LeaderBoard } from "./leaderBoard/index";
import { Board } from "./layout/index";
import { leaderData } from "./leaderBoard/data/leaderData";

function App() {
  return (
    <div>
      <Board>
        <LeaderBoard arrayList={leaderData[0].list} />
      </Board>
    </div>
  );
}

export default App;
