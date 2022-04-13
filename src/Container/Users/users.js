import axios from "axios";
import { useEffect, useState } from "react";
import User from "../../Component/User/user";
import { SERVER } from "../../Constant/constants";

const Users = (props) => {
  const [usersData, setUsersData] = useState([]);

  const fetchUsers = () => {
    axios
      .get(SERVER + "users")
      .then((response) => setUsersData(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const userList = usersData.map((data, index) => {
    return (
      <User data={data} userOnChange={props.userOnChange} key={index}></User>
    );
  });
  return (
    <select className="form-control mt-4">
      <option defaultValue={""}>Select User</option>
      {userList}
    </select>
  );
};
export default Users;
