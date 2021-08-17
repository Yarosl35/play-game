export const RoomItem = ({ changeInput, room }) => {
  return <div onClick={() => changeInput(room)}>{`room ${room}`}</div>;
};
