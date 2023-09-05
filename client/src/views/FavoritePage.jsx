import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { favoriteFetch } from "../stores/actions/actionCreator";

const FavoritePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state?.favorite);

  useEffect(() => {
    dispatch(favoriteFetch());
  }, []);
  return (
    <>
      <h2
        className="flex justify-center"
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          fontFamily: "serif",
          marginTop: "20px",
        }}
      >
        {" "}
        Welcome to Your Favorite Page
      </h2>
      {!favorite && (
        <h1 className="flex mx-6 my-32 justify-center text-xl italic text-[#610C27]">
          Your favorite list is empty.
        </h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mx-20 py-10 ">
        {favorite?.map((favorite) => (
          <Card dress={favorite?.Dress} key={favorite.Dress?.id} />
        ))}
      </div>
    </>
  );
};

export default FavoritePage;
