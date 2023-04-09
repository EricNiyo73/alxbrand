import React, { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

const Nav = () => {
  const [nav, setNav] = useState(true);
  const { auth } = useContext(AppContext);
  console.log(auth);
  return (
    <>
      <header>
        <div className="main_header">
          <div>
            <Link className="link" to="/">
              <h1 className="logo">
                <span>Eric</span>Tech
              </h1>
            </Link>
          </div>
          <ul>
            <li>
              <a href="https://twitter.com/EricNiyokwize10">
                <BsTwitter />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/eric-niyokwizerwa-489b74251/">
                <BsLinkedin />
              </a>
            </li>
            <li>
              <a href="https://github.com/EricNiyo73">
                <BsGithub />
              </a>
            </li>
          </ul>
        </div>
        <div className="burger">
          {nav ? (
            <AiOutlineMenu onClick={() => setNav(!nav)} />
          ) : (
            <AiOutlineClose onClick={() => setNav(!nav)} />
          )}
        </div>
        <nav className={`${nav ? "" : "active"}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/ai">Category</NavLink>
            </li>
            {/* <li>
              <NavLink to="/cloud">Cloud</NavLink>
            </li>
            <li>
              <NavLink to="/devops">DevOps</NavLink>
            </li>
            <li>
              <NavLink to="/blockchain">Blockchain</NavLink>
            </li> */}
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>

          <div className="auth">
            {auth?.token ? (
              <>
                <Link className="user" to="/dashboard">
                  <span className="user">{auth.user.name.split(" ")[0]}</span>
                </Link>
                <Link className="user" to="/dashboard">
                  <button>Go to dashboard</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <span>or</span>
                <Link to="/register">
                  <button className="button">Register</button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Nav;
