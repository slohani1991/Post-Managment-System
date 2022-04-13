const User = (props) => {
  return (
    <option
      onChange={() => props.userOnChange(props.data.id)}
      defaultValue={props.data.id}
    >
      {props.data.name}
    </option>
  );
};
export default User;
