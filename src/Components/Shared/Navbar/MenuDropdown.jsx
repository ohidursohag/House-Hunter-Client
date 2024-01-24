import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

import avatarImg from "../../../assets/Images/placeholder.jpg";

// import toast from "react-hot-toast";


import useClickOutSide from "../../../Hooks/useClickOutSide";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MenuDropdown = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const refWraper = useClickOutSide(setIsOpen);

  const handleLogout = () => {
    // console.log("click hoice");
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then(async (result) => {
      if (result.isConfirmed) { 
        const toastId = toast.loading('Logging out.... ')       
       try {
        logOut();
        toast.success('Logout Successful',{id:toastId}) 
       } catch (error) {
        toast.error(error.message,{id:toastId}) 
       }
      }
    });
  };

  return (
    <div ref={refWraper} className="relative">
      <div
      
       className="flex flex-row items-center gap-3">
        {/* Dropdown btn */}
        <div
          
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {/* Avatar */}
            <img
              className="rounded-full w-[30px] h-[30px] object-cover object-center"
              referrerPolicy="no-referrer"
              src={user && user?.profileImage ? user?.profileImage : avatarImg}
              alt="profile"
              height="30"
              width="30"
            />
          </div>
        </div>
      </div>
      <div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[150px] md:w-[180px] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to={`/dashboard/${user?.userRole}/statistics`}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Dashboard
                </Link>
                <div
                  onClick={() => handleLogout()}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default MenuDropdown;
