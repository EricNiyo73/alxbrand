import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

const UserSharedDashboard = () => {
  const { auth } = useContext(AppContext);
  const [sidebar, setSidebar] = useState(false);
  return (
    <div className="dashboard">
      <div className="nav">
        <div className="nav_logo">
          <div className="logo">
            <Link to="/" className="link">
              <h1>
                <span>Blog</span>Post
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
            <span className="user">
              {auth && auth.user && auth.user.name
                ? auth.user.name.split(" ")[0]
                : "Welcome"}
            </span>

            {/* <span className="user">{auth.user.name.split(" ")[0]}</span> */}
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
        <h4>Manage Your Blogs</h4>
        <ul>
          <li>
            <Link className="link" to="userblogs">
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
      </div>
      <div className="out">
        <Outlet />
      </div>
    </div>
  );
};

export default UserSharedDashboard;
