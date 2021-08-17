import React from "react";
import { MenuRoom } from "./../MenuRoom";
import { leaderData } from "./../data/leaderData";

export default {
  title: "OptionList",
  component: MenuRoom,
};

const Template = (args) => <MenuRoom {...args} />;

export const List = Template.bind({});
List.args = {
  arrayList: leaderData,
};
