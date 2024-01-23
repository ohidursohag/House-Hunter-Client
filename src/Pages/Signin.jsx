import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { TbFidgetSpinner } from 'react-icons/tb'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import { userLogin } from "../Api/auth";
import useAuth from "../Hooks/useAuth";

const Signin = () => {
  const { currentUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    const toastId = toast.loading("Login in progress...");
    const userLoginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const loginResponse = await userLogin(userLoginData);
      console.log(loginResponse.token);
      if (loginResponse.success) {
        toast.success("Successfully Logged In", { id: toastId });
        // Store token in local storage
        // localStorage.setItem('token',loginResponse.token);
        
        currentUser(loginResponse.token);
        navigate("/", { replace: true });
      } else {
        toast.error("Something Went wrong", { id: toastId });
      }
      console.log(userLoginData);
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: toastId });
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign In</h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  id="email"
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">required</p>
                )}
              </div>
              <div className="relative">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type={`${showPass ? "text" : "password"}`}
                  {...register("password", {
                    required: true,
                  })}
                  placeholder="*******"
                  className={`w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900 `}
                />
                <div
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-9 right-2 cursor-pointer"
                >
                  {!showPass ? (
                    <IoMdEye size={25} />
                  ) : (
                    <IoMdEyeOff size={25} color="red" />
                  )}
                </div>
                {errors.password?.type === "required" && (
                  <p className="text-red-500">required</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-rose-500 w-full rounded-md py-3 text-white"
              >
                Continue
              </button>
            </div>
          </form>
          <div className="space-y-1">
            {/* <button className='text-xs hover:underline hover:text-rose-500 text-gray-400'>
            Forgot password?
          </button> */}
          </div>

          <p className="px-6 text-sm text-center text-gray-400 mt-2">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/register"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
