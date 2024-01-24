import { Helmet } from "react-helmet-async";
import HostStatistics from "../../../components/Dashboard/Statistics/HostStatistics";
import useAuth from "../../../Hooks/useAuth";
import HouseOwnerStatistics from "../../../Components/DashBoard/Statistics/HouseOwnerStatistics";

const Statistics = () => {
  const { user } = useAuth();

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {user?.userRole === "house-owner" && <HouseOwnerStatistics />}
      {user?.userRole === "house-renter" && <HostStatistics />}
    </div>
  );
};

export default Statistics;
