import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";

// import { AppContext } from "./context/AppProvider";
import "./axios/global";
import AnimateRoutes from "./components/AnimateRoutes";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // const router = createBrowserRouter(createRoutesFromElements(<></>));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  // const location = useLocation();
  return (
    <div className="App">
      {isLoading ? (
        <div className="loader">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#ff9908"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <Router>
          <AnimateRoutes />
        </Router>
      )}
    </div>
  );
}

export default App;
