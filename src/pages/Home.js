import React from "react";
import SingleList from "../components/SingleList";
// import Slider from "../components/Slider";
const Home = () => {
  return (
    <>
      <main className="home">
        <h1>
          <span>Blog</span>Post
        </h1>
        <p>
          Stay ahead in the dynamic world of technology with our informative and
          insightful articles. Explore a wealth of thoughtfully crafted content
          that empowers you with valuable insights, practical tips, and expert
          perspectives. Join our community of tech enthusiasts and fuel your
          passion for all things tech.
        </p>
      </main>

      <div className="all">
        {[1].map((item, index) => {
          return <SingleList key={index} />;
        })}
      </div>
    </>
  );
};

export default Home;
