import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../stores/actions/actionCreator";
import logo from "../assets/Screenshot_2023-07-27_at_17.11.04-removebg-preview.png";

const RegisterPage = () => {
  const input = {
    username: useRef(),
    email: useRef(),
    password: useRef(),
    phoneNumber: useRef(),
    address: useRef(),
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorRegister } = useSelector((state) => state?.user);

  const registerSubmit = (event) => {
    event.preventDefault();
    const inputRegister = {
      username: input.username.current.value,
      email: input.email.current.value,
      password: input.password.current.value,
      phoneNumber: input.phoneNumber.current.value,
      address: input.address.current.value,
    };
    dispatch(register(inputRegister))
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className=" flex flex-col justify-center min-h-screen overflow-hidden">
        <div
          className="w-[30vw] p-6 m-auto bg-base-100 rounded-md shadow-md lg:max-w-xl"
          style={{ background: "#EFECE9" }}
        >
          <div className="flex justify-center">
            <img
              src={logo}
              style={{ alignItems: "center", width: "90px", height: "70px" }}
            />
          </div>
          <h1
            className="text-xl font-bold text-center text-[#050505] mt-10"
            style={{ fontSize: "22px", fontFamily: "Volkhorn Semibold" }}
          >
            Create New Account
          </h1>
          <form onSubmit={registerSubmit} className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>
              <input
                type="username"
                name="username"
                ref={input.username}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#efece9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                ref={input.email}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#efece9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                ref={input.password}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#efece9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                ref={input.phoneNumber}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#efece9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Address
              </label>
              <input
                type="text"
                name="address"
                ref={input.address}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#efece9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-[#050505] transition-colors duration-200 transform bg-[#DDD9CE] rounded-md hover:bg-[#AC9C8D] focus:outline-none focus:bg-[#AC9C8D]"
              >
                Sign up
              </button>
              <div className="flex items-center w-full my-4">
                <hr className="w-full border-gray-600" />
                <hr className="w-full border-gray-600" />
              </div>
              <p className="text-sm text-center font-light text-[#AC9C8D] mt-2">
                Already have an account?
                <NavLink
                  to="/login"
                  className="font-medium ml-2 text-[#610C27] hover:underline dark:text-primary-500"
                >
                  Sign In{" "}
                </NavLink>
              </p>
              <NavLink to={"/"}>
                <p className="flex justify-center font-medium text-[#AC9C8D] ml-2 hover:underline dark:text-primary-500 mt-5">
                  Back to HomePage
                </p>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
