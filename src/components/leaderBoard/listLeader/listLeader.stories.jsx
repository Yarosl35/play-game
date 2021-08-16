import React from "react";
import { leaderData } from "./../data/leaderData";
import { ListItem } from "./listItem";
import { ListLeader } from "./index";

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
