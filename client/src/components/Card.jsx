import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  addFavoriteSuccess,
  deleteDress,
  detailDressFetch,
} from "../stores/actions/actionCreator";

function Card({ dress }) {
  const { pathname } = useLocation();

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const role = localStorage.getItem("role");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = (e, id) => {
    e.preventDefault();
    dispatch(deleteDress(id));
  };

  const editHandler = (e, id) => {
    e.preventDefault();
    dispatch(detailDressFetch(id));
    navigate(`/edit-dress/${id}`);
  };

  const favoriteHandler = (e, id) => {
    e.preventDefault();
    dispatch(addFavoriteSuccess(id));
  };

  return (
    <>
      <div className="card w-300 bg-[#EFECE9] ">
        <NavLink to={`/detail/${dress.id}`}>
          <figure
            className="px-3 pt-5 h-300 overflow-hidden"
            style={{ height: "500px", backgroundPosition: "center" }}
          >
            <img
              src={dress?.mainImage}
              className="h-full w-full object-cover rounded-sm"
              alt="Dress"
              style={{ borderRadius: "1px" }}
            />
          </figure>
        </NavLink>
        <div className="card-body items-start text-start">
          <div className="container dress-name-container ">
            <NavLink to={`detail/${dress?.id}`}>
              <h3 className="container card-title text-m font-bold text-#050505 overflow-hidden flex-shrink-0 leading-tight max-h-7 line-clamp-2">
                {dress?.name}
              </h3>
            </NavLink>
          </div>
          {pathname !== `/detail-store/${dress?.StoreId}` && (
            <button className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#050505"
                className="mr-1"
                width="16px"
                height="16px"
                style={{ aspectRatio: "1", flexShrink: 0 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
              </svg>
              <NavLink to={`detail-store/${dress?.StoreId}`}>
                <p
                  className="text-sm underline overflow-hidden flex-shrink-0 leading-tight max-h-4 line-clamp-2"
                  style={{ color: "#050505" }}
                >
                  {dress?.Store?.name}
                </p>
              </NavLink>
            </button>
          )}
          <h5 className="text-xs" style={{ color: "#050505" }}>
            Grade: {dress.grade}
          </h5>
          <div className="flex justify-between space-x-20">
            <h4
              className="text-m"
              style={{ fontWeight: "bold", color: "#050505" }}
            >
              {rupiah(dress?.price)}
            </h4>
            {pathname !== "/favorite" && (
              <button
                className="mr-2"
                style={{ color: "currentColor" }}
                onMouseEnter={(e) => {
                  e.target.style.stroke = "red";
                  e.target.style.fill = "red";
                }}
                onMouseLeave={(e) => {
                  e.target.style.stroke = "currentColor";
                  e.target.style.fill = "none";
                }}
                onClick={(e) => {
                  favoriteHandler(e, dress?.id);
                  e.target.style.stroke = "red";
                  e.target.style.fill = "red";
                  setTimeout(() => {
                    e.target.style.stroke = "currentColor";
                    e.target.style.fill = "none";
                  }, 500);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  style={{ transition: "stroke 0.3s ease", fill: "none" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            )}
          </div>
          {role === "Admin" && (
            <div className="flex justify-center mt-3">
              <button
                onClick={(e) => editHandler(e, dress?.id)}
                className="btn mr-2 flex-grow bg-[#DDD9CE] hover:bg-[#DDD9CE] w-28"
              >
                Edit
              </button>
              <button
                onClick={(e) => deleteHandler(e, dress?.id)}
                className="btn mr-2 flex-grow bg-[#610C27] hover:bg-[#E3C1B4] w-28"
                style={{ color: "#EFECE9" }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
