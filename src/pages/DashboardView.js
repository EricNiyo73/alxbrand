import React from "react";
import { useState } from "react";
const DashboardView = () => {
  const [add, setAdd] = useState(false);
  return (
    <div className="content">
      <div className="navigation">
        <button onClick={() => setAdd(false)}>All post</button>
        <button onClick={() => setAdd(true)}>Add post</button>
      </div>
      {add ? <h1>H</h1> : <h1>h</h1>}
    </div>
  );
};

export default DashboardView;
