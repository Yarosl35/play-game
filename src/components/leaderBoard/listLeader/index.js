import React from "react";
import { leaderData } from "./../data/leaderData";
import styles from "./leaderList.module.css";
import { ListItem } from "./listItem";

export const ListLeader = () => {
  console.log(leaderData);
  const listItem = leaderData[0].list.map((data, index) => (
    <ListItem
      name={data.name}
      rank={++index}
      color={"red"}
      scope={data.scope}
    />
  ));
  return <div className={styles.mainContainer}>{listItem}</div>;
};
