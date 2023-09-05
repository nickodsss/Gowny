import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory } from "../stores/actions/actionCreator";
import Loading from "../components/Loading";

function ListTransactions() {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state?.payment);
  const { isLoading } = useSelector((state) => state?.payment);
  const userRole = localStorage.getItem("role"); // Placeholder for user role
  const loggedInUsername = localStorage.getItem("username"); // Placeholder for logged-in username

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  useEffect(() => {
    if (userRole === "Admin") {
      setData(history?.Data?.Transaction);
    } else if (userRole === "User") {
      const filteredData = history?.Data?.Transaction?.filter(
        (el) => el.BuyerName === loggedInUsername
      );
      setData(filteredData);
    }
  }, [history, userRole, loggedInUsername]);

  const pagination = history?.Data?.Pagination;

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-5 mb-60">
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            fontFamily: "serif",
            marginTop: "10px",
          }}
        >
          User Transaction
        </h2>
        <div className=" w-[90vw] ">
          <div className="overflow-x-auto">
            <table className="table mt-10">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Transaction Id</th>
                  <th>Amount</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Paid Status</th>
                  <th>Success Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan="7" className="mx-6">
                      <Loading />
                    </td>
                  </tr>
                )}
                {data?.map((el, index) => {
                  const adjustedIndex =
                    (pagination?.current_page - 1) * pagination?.per_page +
                    index +
                    1;
                  return (
                    <tr key={el?.TransactionId}>
                      <td>{adjustedIndex}</td>
                      <td>{el?.TransactionId}</td>
                      <td>{rupiah(el?.Amount)}</td>
                      <td>{el?.BuyerName}</td>
                      <td>{el?.BuyerEmail}</td>
                      <td>{el?.StatusDesc}</td>
                      <td>{el?.SuccessDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListTransactions;
