import React from "react";
import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const SingleCard = ({ data }) => {
  const { _id, title, date, description, author, comments } = data;
  return (
    <div className="card">
      <img src={data?.image} alt={data.title} />
      <div>
        <div className="blog_text">
          <div className="content">
            <span>
              <AiOutlineUser />
              <span>Posted By {author}</span>
            </span>
            <span>
              <MdDateRange />
              <span>Posted at {date}</span>
            </span>
            <span>
              <AiOutlineComment />
              <span>{comments.length} Comment</span>
            </span>
          </div>
          <div>
            <h3 className="title">
              <Link className="title" to={`/blog/${_id}`}>
                {title}
              </Link>
            </h3>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: description.slice(0, 100) + "...",
            }}
          ></div>
          {/* <h6>{description.slice(0, 100) + "..."}</h6> */}
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
