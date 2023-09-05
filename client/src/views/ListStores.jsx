import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { storesFetch } from "../stores/actions/actionCreator";

function ListStores() {
  const dispatch = useDispatch();

  const { stores } = useSelector((state) => state?.store);
  const { isLoading } = useSelector((state) => state?.store);

  useEffect(() => {
    dispatch(storesFetch());
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-5">
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            fontFamily: "serif",
          }}
        >
          List Stores
        </h2>
        <div className=" w-[90vw] ">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ borderCollapse: "collapse" }}>
                {stores?.map((store, index) => (
                  <tr key={store?.id}>
                    <td>{index + 1}</td>
                    <td>{store.name} </td>
                    <td>{store.address} </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <NavLink to={`/detail-store/${store.id}`}>
                        See Detail
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListStores;
