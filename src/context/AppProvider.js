import React, { createContext, useLayoutEffect } from "react";
import { useState } from "react";
import axios from "../axios/axios";

export const AppContext = createContext({});
const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  // const [letters, setLetters] = useState([]);

  const fetchBlogs = async () => {
    try {
      const data = await axios("/blog", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const usersData = await axios.get("/users");
      // const lettersData = await axios.get("/letters");
      // console.log(lettersData);
      setUsers(usersData.data.data.users);
      setBlogs(data.data.blogs);
    } catch (error) {
      console.log(error.response);
    }
  };
  useLayoutEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("loggedUserData")));
    // Authorization(auth?.token);
    fetchBlogs();
  }, []);
  console.log(blogs);
  return (
    <AppContext.Provider value={{ auth, users, blogs, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
