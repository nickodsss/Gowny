import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { dressesFetch } from "../stores/actions/actionCreator";

function ListProduct() {
  const dispatch = useDispatch();

  const { dresses } = useSelector((state) => state?.dress);
  const { isLoading } = useSelector((state) => state?.dress);

  useEffect(() => {
    dispatch(dressesFetch());
  }, []);

  const { data } = dresses;
  const { pagination } = dresses;
  console.log(data);

  const nextPageHandler = (event, page) => {
    event.preventDefault();
    dispatch(dressesFetch({ page }));
  };

  const backPageHandler = (event, page) => {
    event.preventDefault();
    dispatch(dressesFetch({ page }));
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <div className="flex justify-end mt-5"></div>
      {isLoading && <Loading />}
      <div className="flex flex-col justify-center items-center mt-5">
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            fontFamily: "serif",
          }}
        >
          List Products
        </h2>
        <div className=" w-[90vw] ">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Store</th>
                  <th>Grade</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((dress, index) => {
                  const adjustedIndex =
                    (pagination?.currentPage - 1) * pagination?.totalPerPage +
                    index +
                    1;
                  return (
                    <tr key={dress?.id}>
                      <td>{adjustedIndex}</td>
                      <td>{dress.name}</td>
                      <td className="w-32 p-4">
                        <img src={dress.mainImage} alt="Dress" />
                      </td>
                      <td>{dress.description}</td>
                      <td>{dress.Store.name}</td>
                      <td>{dress.grade}</td>
                      <td>{dress.Category.name}</td>
                      <td>{rupiah(dress.price)}</td>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <NavLink to={`/detail/${dress.id}`}>See Detail</NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="pagination-container">
        <div className="flex items-center justify-center">
          <div className="join" style={{ background: "#EFECE9" }}>
            <button
              onClick={(e) =>
                backPageHandler(
                  e,
                  pagination?.currentPage !== 1
                    ? pagination.currentPage - 1
                    : pagination?.currentPage
                )
              }
              className="join-item btn btn-xs"
              style={{ background: "#EFECE9" }}
            >
              &laquo;
            </button>
            <button
              className="join-item btn btn-xs"
              style={{ background: "#EFECE9" }}
            >
              {pagination?.currentPage}
            </button>
            <button
              onClick={(e) =>
                nextPageHandler(
                  e,
                  pagination?.nextPage !== null
                    ? pagination.currentPage + 1
                    : pagination?.currentPage
                )
              }
              className="join-item btn btn-xs"
              style={{ background: "#EFECE9" }}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListProduct;
