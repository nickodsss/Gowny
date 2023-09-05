import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../stores/actions/actionCreator";
import Navbar from "./Navbar";

function Header() {
  let { isLogin } = useSelector((state) => state?.user);
  const access_token = localStorage.getItem("access_token");
  if (access_token && access_token !== "undefined") {
    isLogin = true;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  return (
    <>
      <div className=" bg-[#050505] flex justify-between">
        <div className="flex items-center">
          {" "}
          {/* Add items-center class here */}
          {role === "Admin" && (
            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <NavLink to={"/listdress"}>
                <button
                  className="btn btn-sm btn-ghost text-sm text-white"
                  style={{
                    fontSize: "16px",
                    color: "white",
                    fontWeight: "normal",
                  }}
                >
                  Products
                </button>
              </NavLink>
              <NavLink to={"/liststore"}>
                <button
                  className="btn btn-sm btn-ghost text-sm text-white"
                  style={{
                    fontSize: "16px",
                    color: "white",
                    fontWeight: "normal",
                  }}
                >
                  Stores
                </button>
              </NavLink>
              <NavLink to={"/categories"}>
                <button
                  className="btn btn-sm btn-ghost text-sm text-white"
                  style={{
                    fontSize: "16px",
                    color: "white",
                    fontWeight: "normal",
                  }}
                >
                  Categories
                </button>
              </NavLink>
            </div>
          )}
          {isLogin && (
            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <NavLink to={"/transaction"}>
                <button
                  className="btn btn-sm btn-ghost text-sm text-white"
                  style={{
                    fontSize: "16px",
                    color: "white",
                    fontWeight: "normal",
                  }}
                >
                  Transactions
                </button>
              </NavLink>
            </div>
          )}
        </div>
        <div className="flex items-center">
          {isLogin && (
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6 mx-1 my-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <h1 className="flex text-white mt-1">{username}</h1>
              <button
                onClick={logoutHandler}
                className="btn btn-sm btn-ghost text-sm text-white"
                style={{
                  fontSize: "16px",
                  color: "white",
                  fontWeight: "normal",
                }}
              >
                Logout
              </button>
            </div>
          )}
          {!isLogin && (
            <div className="flex justify-end">
              <NavLink to={"/login"}>
                <button
                  className="btn btn-sm btn-ghost mr-2 text-sm text-white"
                  style={{
                    fontSize: "16px",
                    color: "white",
                    fontWeight: "normal",
                  }}
                >
                  Login
                </button>
              </NavLink>
              <NavLink to={"/register"}>
                <button
                  className="btn btn-sm btn-ghost text-sm text-white"
                  style={{
                    fontSize: "16px",
                    color: "white",
                    fontWeight: "normal",
                  }}
                >
                  Register
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
