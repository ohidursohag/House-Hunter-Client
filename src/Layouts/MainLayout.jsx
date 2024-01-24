import { Outlet, useNavigation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingAnimation from "../Components/Shared/LoadingAnimation/LoadingAnimation";

const MainLayout = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  console.log(user);
  return (
    <div>
      {navigation.state === "loading" ? <LoadingAnimation /> : <Outlet />}
    </div>
  );
};

export default MainLayout;
