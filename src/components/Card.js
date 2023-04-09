import React from "react";
import parse from "html-react-parser";
import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const { title, _id, comments, image, description, createdAt } = item;
  return (
    <div className="card">
      <img src={image||""} alt={title} />
      <div>
        <div className="blog_text">
          <div className="content">
            <span>
              <AiOutlineUser className="icon" />
              <span>admin</span>
            </span>
            <span>
              <MdDateRange className="icon" />
              <span>{createdAt.substring(0, 10)}</span>
            </span>
            <span className="comment">
              <AiOutlineComment />
              <span>{comments.length} Comment</span>
            </span>
          </div>
          <div className="title">
            <Link to={`/ai/${_id}`}>
              <h3>{title}</h3>
            </Link>
          </div>
          <div className="description">
            {parse(
              description.length < 200
                ? description
                : description.slice(0, 200) + "..."
            )}
          </div>
        </div>
        <Link to={`/ai/${_id}`}>
          <button className="btn">Read more...</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
