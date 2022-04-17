import { Fragment } from "react";
import { useSelector } from "react-redux";
import Login from "../Component/Login/login";
import Header from "../Component/NavBar/Header"
import BasicRoutes from "../Routes/basicRoutes";

const Container = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  let containerJSX = (
    <Fragment>
      <Header></Header>
      <BasicRoutes></BasicRoutes>
    </Fragment>
  );

  if (!isAuthenticated) {
    containerJSX = <Login></Login>
  }

  return containerJSX;


}
export default Container;
