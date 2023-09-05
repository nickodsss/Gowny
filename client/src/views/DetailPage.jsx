import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "../components/CarouselDetail";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailDressFetch, paymentQris } from "../stores/actions/actionCreator";

function DetailPage() {
  useEffect(() => {
    window.scrollTo(0, 36);
  }, []);

  let { isLogin } = useSelector((state) => state?.user);
  const access_token = localStorage.getItem("access_token");
  if (access_token && access_token !== "undefined") {
    isLogin = true;
  }

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailDressFetch(id));
  }, [id]);

  const { detailDress: result } = useSelector((state) => state?.dress);
  const role = localStorage.getItem("role");

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  // -------- payment ----------//

  const handleCreateInvoice = async (event) => {
    event.preventDefault();
    const { name, price } = result;

    const data = {
      name: localStorage.getItem("username"),
      phone: null,
      amount: price,
      email: localStorage.getItem("email"),
      comments: `${name}`,
    };

    try {
      const response = await dispatch(paymentQris(data));
      window.location.href = response;
    } catch (error) {
      console.log(error);
    }
  };

  const loginPage = async (event) => {
    event.preventDefault();
    navigate("/login");
  };

  // --- MODAL SIZE ----- //
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section className="flex flex-row my-6 gap-5 mx-10">
        <div className="w-5/12 ml-10 overflow-hidden">
          <Carousel
            images={{ arrResult: result.Images, mainImage: result.mainImage }}
          />
        </div>
        <div className="w-6/12 ml-10">
          <div className="mt-14">
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "26px",
                  color: "#050505",
                }}
              >
                {result?.name}
              </p>
            </div>

            {/* Description */}
            <div className="mt-8 border-b border-[#AC9C8D] pb-4">
              <h4 className="text-m mb-2 text-[#050505] font-bold">
                Description
              </h4>
              <p className="mt-2 text-[#050505]">{result?.description}</p>
            </div>
            {/* Store */}
            <div className="mt-8">
              <div className="flex items-center text-[#050505]">
                <NavLink to={`/detail-store/${result?.Store?.id}`}>
                  <div className="mt-8 text-[#050505] cursor-pointer focus-outline hover-bg-gray">
                    <h4 className="flex items-center font-bold ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#050505"
                        className="mr-2"
                        width="16px"
                        height="16px"
                        style={{ aspectRatio: "1", flexShrink: 0 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                        />
                      </svg>{" "}
                      {result?.Store?.name}
                    </h4>
                  </div>
                </NavLink>
              </div>
            </div>
            {/* Category */}
            <div className="mt-4 text-[#050505]">
              <span className="font-bold mr-2">Category:</span>
              {result?.Category?.name}
            </div>
            {/* Grade */}
            <div className="mt-4 text-[#050505]">
              <span className="font-bold mr-2">Grade:</span>
              {result?.grade}
            </div>
            {/* Size Guide */}
            <div className="mt-4 text-[#050505] flex items-center">
              <img
                src="https://www.thedressoutlet.com/cdn/shop/t/243/assets/icon_sizechar.png"
                className="h-5 w-5 mr-2"
                alt="Size Guide Icon"
              />
              <button
                className="font-bold text-blue-600 underline"
                onClick={openModal}
              >
                Size Guide
              </button>
            </div>
            {/* Price */}
            <div className="mt-6">
              <h4
                className="text-m mb-2 text-[#050505] font-bold"
                style={{ fontSize: "36px", display: "flex" }}
              >
                {rupiah(result?.price)}
              </h4>
            </div>
            {/* Add to cart button */}
            {role !== "Admin" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "36px",
                }}
              >
                <button
                  className="w-full px-4 py-2 tracking-wide text-[#050505] transition-colors duration-200 transform bg-[#DDD9CE] rounded-md hover:bg-[#AC9C8D] focus:outline-none focus:bg-[#AC9C8D]"
                  style={{ width: "100%", borderRadius: "0" }}
                  // onClick={handleCreateInvoice}
                  onClick={isLogin ? handleCreateInvoice : loginPage}
                >
                  {isLogin ? "Payment" : "Please Login First"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal component */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md">
            {/* Modal content */}
            <img
              src="https://images.squarespace-cdn.com/content/v1/61a59cecbe81401c82cd9529/6fca8c5c-313b-4ea7-b033-3da41d75da2a/Screen+Shot+2022-02-02+at+11.03.36+am.png"
              className="py-4"
              style={{ height: "600px" }}
              alt="Size Guide"
            />
            <button
              className="btn"
              onClick={closeModal}
              style={{ marginLeft: "36rem" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPage;
