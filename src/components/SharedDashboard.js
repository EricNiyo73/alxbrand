import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

const SharedDashboard = () => {
  const { auth } = useContext(AppContext);
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="dashboard">
      <div className="nav">
        <div className="nav_logo">
          <div className="logo">
            <Link to="/" className="link">
              <h1>
                <span>Tech</span>Trends
              </h1>
            </Link>
          </div>
          <div
            className="menu"
            onClick={() => {
              setSidebar(!sidebar);
            }}
          >
            <AiOutlineMenu />
          </div>
        </div>
        <div className="logout">
          <div className="user_logout">
            <span className="user">{auth.user.name.split(" ")[0]}</span>
          </div>
          <div className="">
            <span
              className="logout_btn"
              onClick={() => {
                localStorage.removeItem("loggedUserData");
                window.location.reload(true);
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
      <div className={`sidebar ${sidebar ? "sidebar_active" : "sidebar_not"}`}>
        <h4>Dashboard</h4>
        <ul>
          <li>
            <Link to="/dashboard" className="link">
              <span>Analytics</span>
            </Link>
          </li>
        </ul>
        <h4>Manage blogs</h4>
        <ul>
          <li>
            <Link className="link" to="blogs">
              {/* <span>
                <FaBloggerB />
              </span> */}
              <span>Blogs</span>
            </Link>
          </li>
          <li>
            <Link className="link" to="create">
              {/* <span> */}
              {/* <FaQuestionCircle /> */}
              {/* </span> */}
              <span>Create blog</span>
            </Link>
          </li>
        </ul>
        <h4>Manage Emails</h4>
        <ul>
          <li>
            <Link className="link" to="queries">
              <span>Queries</span>
            </Link>
          </li>
          <li>
            <Link className="link" to="letters">
              <span>News Letter email</span>
            </Link>
          </li>
        </ul>
        <h4>Manage users</h4>
        <ul>
          <li>
            <Link className="link" to="users">
              <span>All users</span>
            </Link>
          </li>
          {/* <li>
            <Link className="link" to="/login">
              <span>Login</span>
            </Link>
          </li>
          <li>
            <Link className="link" to="/register">
              <span>Register</span>
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="out">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedDashboard;
