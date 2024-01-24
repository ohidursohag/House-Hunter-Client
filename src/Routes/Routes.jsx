import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import Register from "../Pages/Register";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import ErrorPage from "../Pages/ErrorPage";

import AddNewHouse from "../Pages/Dashboard/HouseOwner/AddNewHouse";
import MyListedHouses from "../Pages/Dashboard/HouseOwner/MyListedHouses";
import MyRentals from "../Pages/Dashboard/HouseRenter/MyRentals";
import Profile from "../Pages/Dashboard/Common/Profile";
import HouseOwnerStatistics from "../Components/DashBoard/Statistics/HouseOwnerStatistics";
import HouseRenterStatistics from "../Components/DashBoard/Statistics/HouseRenterStatistics";

const MyCreatedRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Home /> }],
  },
  { path: "/login", element: <Signin /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "house-owner/add-new-house",
        element: <AddNewHouse />,
      },
      {
        path: "house-owner/statistics",
        element: <HouseOwnerStatistics />,
      },
      {
        path: "house-owner/my-listed-house",
        element: <MyListedHouses />,
      },
      {
        path: "house-owner/manage-rended-houses",
        element: <MyListedHouses />,
      },
      {
        path: "house-renter/my-rentals",
        element: <MyRentals />,
      },
      {
        path: "house-renter/statistics",
        element: <HouseRenterStatistics />,
      },
    ],
  },
]);

export default MyCreatedRoutes;
