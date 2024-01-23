/* eslint-disable no-useless-escape */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import { uploadImage } from "../Api/imageUpload";
import { userRegistration } from "../Api/auth";
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    
    const toastId = toast.loading("Registering...");

   try {
    const fullName = data?.fullName;
    const email = data?.email;
    const userRole = data?.userRole;
    const phoneNumber = data?.phoneNumber;
    const password = data?.password;
    // upload profile Image
    const imageUploadResponse = await uploadImage(data?.profileImage[0]);
    const profileImage = imageUploadResponse?.data?.url;
    console.log(imageUploadResponse, profileImage);
    const userRegistrationData = {
      fullName,
      email,
      profileImage,
      password,
      userRole,
      phoneNumber,
    };
    console.log(userRegistrationData);
    const registrationResponse = await userRegistration(userRegistrationData)
    console.log(registrationResponse)
    if (registrationResponse.error) {
        toast.error(registrationResponse.message,{id:toastId})
    } else {
        toast.success(registrationResponse.message,{id:toastId})
        navigate('/login', { replace: true })
    }
   } catch (error) {
    toast.error(error.message,{id:toastId})
   }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">Welcome to House Hunter</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName", { required: true })}
                  id="fullName"
                  placeholder="Enter Your Full Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.fullName?.type === "required" && (
                  <p className="text-red-500 text-sm">required</p>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                  <label htmlFor="image" className=" block mb-2 text-sm">
                    Select Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    {...register("profileImage", { required: true })}
                    accept="image/*"
                    className="w-full"
                  />
                  {errors.profileImage?.type === "required" && (
                    <p className="text-red-500 text-sm">required</p>
                  )}
                </div>
                <div className="">
                  <label className="block mb-2 text-sm">Select Role:</label>
                  <select
                    {...register("userRole", { required: true })}
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  >
                    <option value="">Select role</option>
                    <option value="house-renter">House Renter</option>
                    <option value="house-owner">House Owner</option>
                  </select>
                  {errors.userRole?.type === "required" && (
                    <p className="text-red-500 text-sm">required</p>
                  )}
                </div>
              </div>

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
                  <p className="text-red-500 text-sm">required</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Phone Number
                </label>
                <input
                  type="phone"
                  {...register("phoneNumber", { required: true })}
                  id="phoneNumber"
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.phoneNumber?.type === "required" && (
                  <p className="text-red-500 text-sm">required</p>
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
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                  })}
                  id="password"
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
                  <p className="text-red-500 text-sm">required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500 text-sm">
                    password must be more than 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500 text-sm">
                    password must have contain minimum 1 uppercase, 1 lowercase,
                    1 number and 1 special character
                  </p>
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

          <p className="px-6 text-sm text-center text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
             SignIn
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
