import axios from "axios";
//url
export default axios.create({
  baseURL: "https://alxbackend-1.onrender.com/api/v1/",
});

// export default axios.create({
//   baseURL: "http://localhost:5000/api/v1/",
// });

// export default axios.create({
//   baseURL: "http://127.0.0.1:5000/api/v1/",
// });
