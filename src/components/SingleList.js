import React, { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import blog from "./data/blog";
import SingleCard from "./SingleCard";

const SingleList = () => {
  const { blogs } = useContext(AppContext);
  return (
    <div className="full_category">
      <h4 className="category">Artificial intelligence</h4>
      {blogs.map((item, index) => {
        if (index < 3) {
          return <SingleCard key={index} data={item} />;
        }
      })}
    </div>
  );
};

export default SingleList;
