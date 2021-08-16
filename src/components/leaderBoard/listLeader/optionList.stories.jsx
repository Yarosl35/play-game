import React from "react";
import { OptionList } from "./optionList";

export default {
  title: "OptionList",
  component: OptionList,
};

const Template = (args) => <OptionList {...args} />;

export const List = Template.bind({});
List.args = {
  // arrayList: leaderData[0].list,
};
