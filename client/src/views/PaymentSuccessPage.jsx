import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PaymentSuccess = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center card w-[40vw] h-[80vh] bg-base-100 border border-black">
          <figure className="px-10 pt-2">
            <img
              src="https://cdn.dribbble.com/users/147386/screenshots/5315437/success-tick-dribbble.gif"
              alt="success"
              className="rounded-xl"
              style={{ width: "800px", height: "400px" }}
            />
          </figure>
          <div className="card-body items-center text-center">
            <h1 className="card-title mb-5" style={{ fontSize: "48px" }}>
              Payment Successful
            </h1>
            <h2 className="card-title mt-5" style={{ fontSize: "22px" }}>
              Thank you, your purchase has been processed!
            </h2>

            <div className="card-actions mt-12">
              <NavLink to={"/transaction"}>
                <button className=" btn w-full px-4 py-2 tracking-wide text-[#efece9] transition-colors duration-200 transform bg-[#610C27] rounded-md hover:bg-[#AC9C8D] focus:outline-none focus:bg-[#E3C1B4] ">
                  Back To HomePage
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
