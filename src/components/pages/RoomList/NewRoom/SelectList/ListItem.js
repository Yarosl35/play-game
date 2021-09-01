export const ListItem = ({ changeInput, data }) => {
  return <div onClick={() => changeInput(data)}>{data.name}</div>;
};
