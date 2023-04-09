import React from "react";

const News = () => {
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
            {[1, 2, 4, 5, 6, 7].map((item, index) => {
              // const { title, date, _id } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{"karisimbitech@gmail.com"}</td>
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
