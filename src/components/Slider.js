import React from "react";
import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";

const Slider = () => {
  return (
    <div className="slider">
      <h2 className="h2">Trending</h2>

      <div className="blog">
        <img src="/post/ai.jpg" alt="Artificial intelligence" />
        <div className="blog_text">
          <div className="content">
            <span>
              <AiOutlineUser />
              <span>admin</span>
            </span>
            <span>
              <MdDateRange />
              <span>January 12 2023</span>
            </span>
            <span>
              <AiOutlineComment />
              <span>3 Comment</span>
            </span>
          </div>
          <div className="title">
            <h3>
              Exploring the World of Artificial Intelligence: Understanding Its
              Applications, Benefits, and Challenges
            </h3>
          </div>
          <div className="description">
            Artificial Intelligence (AI) is a rapidly growing field that
            involves the simulation of human intelligence in machines. From
            virtual personal assistants to self-driving cars, AI has already
            transformed many aspects of our daily lives.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
