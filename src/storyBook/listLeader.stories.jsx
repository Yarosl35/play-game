import React from "react";
import { ListItem } from "./../components/leaderBoard/listLeader/listItem";
import { ListLeader } from "./../components/leaderBoard/listLeader/index";
import { leaderData } from "../components/leaderBoard/data/leaderData";

export default {
  title: "ListPage",
  component: ListLeader,
  subcomponents: { ListItem },
};

const Template = (args) => <ListLeader {...args} />;

export const List = Template.bind({});
List.args = {
  arrayList: leaderData[0].list,
};
