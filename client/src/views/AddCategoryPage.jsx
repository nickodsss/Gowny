import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCategorySuccess,
  categoryFetch,
} from "../stores/actions/actionCreator";

function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addCategory, setCategory] = useState({
    name: "",
  });

  const inputForm = (e) => {
    setCategory({
      ...addCategory,
      [e.target.name]: e.target.value,
    });
  };

  const submitCategories = async (e) => {
    e.preventDefault();
    const response = addCategory;
    await dispatch(addCategorySuccess(response));
    //reset
    setCategory({
      name: "",
    });
    await dispatch(categoryFetch());
    navigate("/categories");
  };
  return (
    <>
      <div className=" flex flex-col justify-center min-h-[80vh] overflow-hidden ">
        <div
          className="w-[50vw] p-6 m-auto bg-base-100 rounded-md shadow-md lg:max-w-xl"
          style={{ background: "#EFECE9" }}
        >
          <h1
            className="text-3xl font-semibold text-center text-black "
            style={{ fontSize: "22px", fontFamily: "Volkhorn Semibold" }}
          >
            Add New Category
          </h1>
          <form className="mt-6" onSubmit={submitCategories}>
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-[#050505]"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter dress name here ..."
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
                onChange={inputForm}
              />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-[#efece9] transition-colors duration-200 transform bg-[#610C27] rounded-md hover:bg-[#AC9C8D] focus:outline-none focus:bg-[#E3C1B4]">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCategory;
