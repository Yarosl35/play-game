import React from "react";
import { RoomItem } from "../components/leaderBoard/MenuRoom/RoomItem";
import styles from "../components/leaderBoard/MenuRoom/MenuRoom.module.css";

export default {
  title: "MenuRoomItem",
  component: RoomItem,
};

const Template = (args) => (
  <div className={styles.options}>
    <RoomItem {...args} />
  </div>
);

export const List = Template.bind({});
List.args = {
  room: 1,
  changeInput: (e) => e,
};
