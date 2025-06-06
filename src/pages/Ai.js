import React, { useContext } from "react";
import Card from "../components/Card";
import Side from "../components/Side";
import { AppContext } from "../context/AppProvider";

const Blog = () => {
  const { blogs } = useContext(AppContext);

  return (
    <div className="ai single">
      <h1>Artificial intelligence /</h1>
      <div className="content">
        <div className="allai">
          {blogs?.map((item, index) => {
            return <Card key={item.id} item={item} index={index} />;
          })}
        </div>
        <Side />
      </div>
    </div>
  );
};

export default Blog;
