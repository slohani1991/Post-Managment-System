
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../../store/config/storeConfig";


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authAction.logout());
    navigate("/login");
  }


  let headerJSX = (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">Post Managment System</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ">
          <li className="nav-item">
            <Link className="nav-link" to={"/dashboard"}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/posts"}>
              Post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/add-post"}>
              Add New Post
            </Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-danger float-right" onClick={() => logoutHandler()} >Logout</button>

          </li>
        </ul>
      </div>
    </nav >
  )

  return headerJSX;

};
export default Header;
