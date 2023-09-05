import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDress,
  categoryFetch,
  detailDressFetch,
  dressesFetch,
  editDress,
} from "../stores/actions/actionCreator";

function AddEditDressForm({ detailDressFromPage, StoreId }) {
  const { id } = useParams();
  const { detailDress, error } = useSelector((state) => state?.dress);
  const { categories } = useSelector((state) => state?.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    CategoryId: "",
    grade: "",
    mainImage: "",
    price: "",
    StoreId: StoreId,
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
  });

  useEffect(() => {
    dispatch(categoryFetch());
    if (detailDressFromPage) {
      setFormValue({
        ...detailDressFromPage,
        StoreId: StoreId,
        imageUrl1: detailDressFromPage?.Images?.[0]?.name || "",
        imageUrl2: detailDressFromPage?.Images?.[1]?.name || "",
        imageUrl3: detailDressFromPage?.Images?.[2]?.name || "",
      });
    }
  }, [detailDressFromPage]);

  const dressFormInput = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
      StoreId: StoreId,
    });
  };

  const dressSubmitHandler = (event, id) => {
    event.preventDefault();

    if (id) {
      dispatch(editDress(formValue, id))
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(addDress(formValue))
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Cinderella Divine Sleeveless Mermaid Wedding Gown

  return (
    <>
      {/* <pre>{JSON.stringify(formValue, null, 4)}</pre> */}
      {/* <pre>{JSON.stringify(formValue?.CategoryId, null, 4)}</pre> */}
      <div className=" flex flex-col justify-center min-h-screen overflow-hidden ">
        <div
          className="w-[50vw] p-10 m-auto bg-base-100 rounded-md shadow-md lg:max-w-xl mt-8"
          style={{ background: "#EFECE9" }}
        >
          <h1
            className="text-3xl font-semibold text-center text-[#050505]"
            style={{ fontSize: "26px", fontFamily: "Volkhorn Semibold" }}
          >
            {id ? "Edit Detail Dress" : "Add New Dress"}
          </h1>
          {error && <div className="text-red-500">{error}</div>}
          <form
            onSubmit={(e) =>
              id ? dressSubmitHandler(e, id) : dressSubmitHandler(e)
            }
            className="mt-6"
          >
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
                value={formValue?.name ?? ""}
                onChange={dressFormInput}
                placeholder="Enter dress name here ..."
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-[#050505]"
              >
                Description:
              </label>
              <textarea
                type="text"
                placeholder="Enter description here..."
                name="description"
                value={formValue?.description ?? ""}
                onChange={dressFormInput}
                style={{ height: "130px" }}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-[#050505]"
                htmlFor="CategoryId"
                id="CategoryId"
              >
                Category:
              </label>
              <select
                type="text"
                id="CategoryId"
                name="CategoryId"
                onChange={dressFormInput}
                value={formValue?.CategoryId ?? ""}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              >
                <option disabled value={""}>
                  Select Category
                </option>
                {categories?.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    // selected={formValue?.CategoryId === category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-[#050505]"
                htmlFor="grade"
                id="grade"
              >
                Grade:
              </label>
              <select
                value={formValue?.grade ?? ""}
                name="grade"
                onChange={dressFormInput}
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              >
                <option disabled value={""}>
                  Select Grade
                </option>
                <option value="S">S</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-[#050505]"
                htmlFor="mainImage"
              >
                Main Image Url:
              </label>
              <input
                value={formValue?.mainImage ?? ""}
                type="text"
                name="mainImage"
                onChange={dressFormInput}
                placeholder="Enter tags here..."
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-[#050505]"
                htmlFor="price"
              >
                Price:
              </label>
              <input
                value={formValue?.price ?? ""}
                type="text"
                name="price"
                onChange={dressFormInput}
                placeholder="Enter image URL here..."
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-[#050505]"
                htmlFor="imageUrl1"
              >
                Image Url 1:
              </label>
              <input
                type="text"
                name="imageUrl1"
                onChange={dressFormInput}
                value={formValue.imageUrl1}
                placeholder="Enter image URL here..."
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-[#050505]"
                htmlFor="imageUrl2"
              >
                Image Url 2:
              </label>
              <input
                type="text"
                name="imageUrl2"
                onChange={dressFormInput}
                value={formValue.imageUrl2}
                placeholder="Enter image URL here..."
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-sm font-semibold text-[#050505]"
                htmlFor="imageUrl3"
              >
                Image Url 3:
              </label>
              <input
                type="text"
                name="imageUrl3"
                onChange={dressFormInput}
                value={formValue.imageUrl3}
                placeholder="Enter image URL here..."
                className="block w-full px-4 py-2 mt-2 text-[#050505] bg-[#EFECE9] border border-[#050505] rounded-md focus:border-[#050505] focus:ring-[#050505] focus:outline-none focus:ring-opacity-10"
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

export default AddEditDressForm;
