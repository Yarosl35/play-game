import React, {useState} from "react";

import { useDispatch } from "react-redux";
import { roomListSelect } from "./../../../../redux/feature/reducer";
import ListIcon from "./ListIcon.svg";
import { Link } from "react-router-dom";
import removeIcon from './remove.svg';
import styles from "../../Players/PlayersItem/PlayersItem.module.css";
import { RemoveRoomConfirm } from '../RemoveRoomConfirm';
import { formatDate }  from '../../../../services/commonService';

export const RoomsItem = ({ data }) => {
  const dispatch = useDispatch();
  const [showRemoveRoomConfirm, setShowRemoveRoomConfirm] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState();

  const selectRoom = () => {
    dispatch(roomListSelect(data.roomID));
  };
  const removeRoom = (e, roomID) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedRoomId(roomID);
    setShowRemoveRoomConfirm((show) => !show);
  };

  return (
    <div>
      {showRemoveRoomConfirm ? <RemoveRoomConfirm setShowModal={setShowRemoveRoomConfirm} selectedRoomId={selectedRoomId} /> : null}
      <Link
        to={`/dash-board/}`}
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
            <p>{formatDate(data.setting.timeSetting.startTime) || '-'}</p>
          </div>
          <div>
            <p>Time: </p>
            <p>{ formatDate(data.setting.timeSetting.startTime, 'LT') }
              -
              { formatDate(data.setting.timeSetting.endTime,'LT') }
            </p>
          </div>
          <div className={styles.remove}>
            <img
              onClick={(e) => removeRoom(e, data.roomID)}
              src={removeIcon}
              alt={"remove"}
            />
          </div>
        </li>
      </Link>
    </div>
  );
};
