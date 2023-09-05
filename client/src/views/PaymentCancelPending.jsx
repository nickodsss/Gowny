import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const PaymentCancelPending = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="flex justify-center card w-[40vw] h-[80vh] bg-base-100 border border-black ">
          <figure className="px-10 pt-2">
            <img
              src="https://i.mscwlns.co/media/misc/others/animation_500_le2spuuh_AuTWHyLwh.gif?tr=w-600"
              alt="success"
              className="rounded-xl"
              style={{ width: "400px", height: "400px" }}
            />
          </figure>
          <div className="card-body items-center text-center">
            <h1 className="card-title mb-5" style={{ fontSize: "48px" }}>
              Payment Failed
            </h1>
            <p className=" card-title mt-5" style={{ fontSize: "18px" }}>
              Unfortunately payment was rejected, please try again later
            </p>

            <div className="card-actions mt-12">
              <button className="w-full px-4 py-2 tracking-wide text-[#efece9] transition-colors duration-200 transform bg-[#610C27] rounded-md hover:bg-[#AC9C8D] focus:outline-none focus:bg-[#E3C1B4] ">
                Back To HomePage
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentCancelPending;
