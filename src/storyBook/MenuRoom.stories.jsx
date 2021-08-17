import React from "react";
import { MenuRoom } from "../components/leaderBoard/MenuRoom";
import { leaderData } from "../components/leaderBoard/data/leaderData";

export default {
  title: "MenuRoom",
  component: MenuRoom,
};

const Template = (args) => <MenuRoom {...args} />;

export const List = Template.bind({});
List.args = {
  arrayList: leaderData,
  changeRoom: (e) => e,
};
