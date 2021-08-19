import ListIcon from "./ListIcon.svg";
import styles from "./RoomsItem.module.css";

export const RoomsItem = ({ data }) => {
  // id: 5,
  // name: "St. Louis Form 4",
  // competition: "intraschool Competition",
  // date: "29/7/2021",
  // time: "3:00pm-4:00pm",
  return (
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
  );
};
