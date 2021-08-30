import { useDispatch } from "react-redux";

import { roomListSelect } from "./../../../../redux/feature/reducer";
import ListIcon from "./ListIcon.svg";
import { Link } from "react-router-dom";

export const RoomsItem = ({ data }) => {
  const dispatch = useDispatch();
  const selectRoom = () => {
    dispatch(roomListSelect(data.id));
  };
  return (
    <Link
      to={`/dash-board/${data.id}`}
      onClick={selectRoom}
      style={{ textDecoration: "none" }}
    >
      <li>
        <div>
          <img src={ListIcon} alt="icon" />
        </div>
        <div>
          <div>
            <p>{data.name}</p>
            <p>{data.competition}</p>
          </div>
        </div>
        <div>
          <p>Date:</p>
          <p>{data.date}</p>
        </div>
        <div>
          <p>Time: </p>
          <p>{data.time}</p>
        </div>
      </li>
    </Link>
  );
};
