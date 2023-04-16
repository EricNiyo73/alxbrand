import React from "react";
import { useContext } from "react";

import { AppContext } from "../../context/AppProvider";
const News = () => {
  const { letters } = useContext(AppContext);
  return (
    <div className="content">
      <div className="table">
        <h1>Subscribers emails</h1>
        <table>
          <thead>
            <tr>
              <th>N</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr> */}
            {letters.map((item, index) => {
              const { email } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{email}</td>
                  <td className="actions">
                    <span
                      className="delete"
                      onClick={() => {
                        console.log("deleted");
                      }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              );
            })}
            {/* </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default News;
