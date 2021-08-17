import React from "react";

import { ListItem } from "./../components/leaderBoard/listLeader/listItem";

export default {
  title: "ListItemComponent",
  component: ListItem,
};

const Template = (args) => <ListItem {...args} />;

export const FirstPlace = Template.bind({});
FirstPlace.args = {
  name: "Matthew Choi",
  color: "rgba(254, 181, 71, 0.68)",
  score: 2000,
  rank: 1,
};

export const SecondPlace = Template.bind({});
SecondPlace.args = {
  name: "Stephen Yip",
  color: "#B4B4B4",
  score: 1500,
  rank: 2,
};

export const ThirdPlace = Template.bind({});
ThirdPlace.args = {
  name: "Edison Chan",
  color: "#AD8A56",
  score: 1000,
  rank: 3,
};
export const OtherPlace = Template.bind({});
OtherPlace.args = {
  name: "Francis Lo",
  color: "#fff",
  score: 100,
  rank: 4,
};
