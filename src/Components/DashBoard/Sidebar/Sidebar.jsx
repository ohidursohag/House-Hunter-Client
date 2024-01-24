import { useState } from "react";
// Components

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import MenuItem from "./MenuItem";

import HouseOwnerMenu from "../Menu/HouseOwnerMenu";
import HouseRenterMenu from "../Menu/HouseRenterMenu";
import Logo from "../../Utilities/Logo";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  console.log(user?.userRole);
  const handleLogout = () => {
    // console.log("click hoice");
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Logging out.... ");
        try {
          logOut();
          toast.success("Logout Successful", { id: toastId });
          navigate("/", { replace: true });
        } catch (error) {
          toast.error(error.message, { id: toastId });
        }
      }
    });
  };
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden ">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Logo />
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          !isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full  flex px-4 py-2 shadow-lg rounded-lg justify-center items-center  mx-auto">
              <Logo />
            </div>
          </div>
          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <MenuItem
              icon={BsGraphUp}
              label="Statistics"
              address={`/dashboard/${user?.userRole}/statistics`}
            />
            {/* If a user is host */}
            {/* Host Menu Items */}
            {user?.userRole === "house-owner" && <HouseOwnerMenu />}
            {user?.userRole === "house-renter" && <HouseRenterMenu />}
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;