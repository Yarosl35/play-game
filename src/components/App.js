import { LeaderBoard } from "./leaderBoard/index";
import { Board } from "./layout/index";

function App() {
  return (
    <div className="App">
      <Board>
        <LeaderBoard />
      </Board>
    </div>
  );
}

export default App;
