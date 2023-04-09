import React from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import TrackAuth from "../context/TrackAuth";
import ProtectRoute from "../context/ProtectRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import SharedDashboard from "./SharedDashboard";
import DashboardView from "../pages/DashboardView";
import SharedComponent from "./SharedComponent";
import Ai from "../pages/Ai";
import SingleBlog from "../pages/SingleBlog";
import Cloud from "../pages/Cloud";
import DevOps from "../pages/DevOps";
import BlockChain from "../pages/BlockChain";
import Analytics from "../pages/dashboard/Analytics";
import Blogs from "../pages/dashboard/Blogs";
import Create from "../pages/dashboard/Create";
import Users from "../pages/dashboard/Users";
import Queries from "../pages/dashboard/Queries";
import News from "../pages/dashboard/News";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./AnimatedPage";

const AnimateRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<SharedComponent />}>
          <Route
            index
            element={
              <AnimatedPage>
                <Home />
              </AnimatedPage>
            }
          ></Route>
          {/* <Route path="blog" element={<BlogShared />}> */}
          <Route
            path="ai"
            element={
              <AnimatedPage>
                <Ai />
              </AnimatedPage>
            }
          ></Route>
          <Route
            path="ai/:aiId"
            element={
              <AnimatedPage>
                <SingleBlog />
              </AnimatedPage>
            }
          ></Route>
          <Route path="/cloud" element={<Cloud />}></Route>
          <Route path="cloud/:cloudId" element={<SingleBlog />}></Route>
          <Route path="/devops" element={<DevOps />}></Route>
          <Route path="devops/:devopsId" element={<SingleBlog />}></Route>
          <Route path="/blockchain" element={<BlockChain />}></Route>
          <Route path="blockchain/:aiId" element={<SingleBlog />}></Route>
          <Route
            path="login"
            element={
              <TrackAuth>
                <Login />
              </TrackAuth>
            }
          />
          <Route
            path="register"
            element={
              <TrackAuth>
                <Register />
              </TrackAuth>
            }
          />
          <Route path="*" element={<Home />}></Route>
          {/* </Route> */}
          <Route
            path="/contact"
            element={
              <AnimatedPage>
                <Contact />
              </AnimatedPage>
            }
          ></Route>
          <Route path="*" element={<Home />}></Route>
        </Route>
        <Route
          path="dashboard"
          element={
            <ProtectRoute>
              <SharedDashboard />
            </ProtectRoute>
          }
        >
          <Route index path="" element={<Analytics />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="create" element={<Create />} />
          <Route path="users" element={<Users />} />
          <Route path="queries" element={<Queries />} />
          <Route path="letters" element={<News />} />
          <Route path="*" element={<DashboardView />} />
        </Route>{" "}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimateRoutes;
