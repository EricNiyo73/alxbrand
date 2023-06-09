import React, { useContext, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
import { AppContext } from "../../context/AppProvider";
import { motion } from "framer-motion";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Analytics = () => {
  const { users, blogs, letters } = useContext(AppContext);

  const allData = [
    {
      id: 11,
      year: 2023,
    },
    {
      id: 3,
      year: 2084,
    },
    {
      id: 47,
      year: 2015,
    },
    {
      id: 500,
      year: 2096,
    },
    {
      id: 7,
      year: 2017,
    },
  ];

  const [userData] = useState({
    labels: allData.map((item) => item.id),
    datasets: [
      {
        label: "User statistics",
        data: allData.map((item) => item.year),
        backgroundColor: ["#ff9908", "#222222", "#3a414e", "#5a606a"],
      },
    ],
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="charts">
        <div className="">
          <Bar data={userData} />
        </div>
        <div className="">
          <Line data={userData} />
        </div>
        {/* <div className="">
          <Pie data={userData} />
        </div> */}
      </div>
      <div className="main_dashboard">
        <div>
          <span className="number">{users?.length}</span>
          <span>All users</span>
        </div>
        <div>
          <span className="number">{blogs?.length}</span>
          <span>All blogs</span>
        </div>
        <div>
          <span className="number">{letters?.length}</span>
          <span>New letters</span>
        </div>
        {/* <div>
          <span className="number">43</span>
          <span>All queries</span>
        </div> */}
      </div>
    </motion.div>
  );
};

export default Analytics;
