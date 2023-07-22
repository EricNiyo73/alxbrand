import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const Users = () => {
  const { users } = useContext(AppContext);
  return (
    <div className="content">
      <div className="table">
        <h1>All Users</h1>
        <table>
          <thead>
            <tr>
              <th>N</th>
              <th>Full Names</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr> */}
            {users.map((item, index) => {
              const { email, name } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
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

export default Users;
