import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import Register from "../Pages/Register";
import DashBoardLayout from "../Layouts/DashBoardLayout";

const MyCreatedRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: "/login", element: <Signin /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: <DashBoardLayout/>
  }
]);

export default MyCreatedRoutes;
