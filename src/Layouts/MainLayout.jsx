import { Outlet, useNavigation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingAnimation from "../Components/Shared/LoadingAnimation/LoadingAnimation";
import Navbar from "../Components/Shared/Navbar/Navbar";

const MainLayout = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  console.log(user);
  return (
    <div className="min-h-screen">
      <Navbar/>
      {navigation.state === "loading" ? <LoadingAnimation /> : <Outlet />}
    </div>
  );
};

export default MainLayout;
