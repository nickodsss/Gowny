import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { categoryFetch, deleteCategory } from "../stores/actions/actionCreator";
import { NavLink } from "react-router-dom";

function ListCategory() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state?.category);
  const { isLoading } = useSelector((state) => state?.category);

  useEffect(() => {
    dispatch(categoryFetch());
  }, []);

  const deleteCategoryLink = (event, id) => {
    event.preventDefault();
    dispatch(deleteCategory(id));
  };

  return (
    <>
      <div className="flex justify-end mt-5">
        <NavLink to={"/add-categories"}>
          <button className="btn mr-3">Add New Category</button>
        </NavLink>
      </div>
      <div className="flex flex-col justify-center items-center mt-5">
        {isLoading && <Loading />}
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            fontFamily: "serif",
          }}
        >
          List Categories
        </h2>
        <div className=" w-[90vw] ">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody style={{ borderCollapse: "collapse" }}>
                {categories?.map((category, index) => (
                  <tr key={category?.id}>
                    <td>{index + 1}</td>
                    <td>{category.name} </td>
                    <td
                      className="underline"
                      onClick={(e) => deleteCategoryLink(e, category.id)}
                    >
                      Delete
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

export default ListCategory;
