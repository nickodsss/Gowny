import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "../components/Carousel";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { dressesFetch, storesFetch } from "../stores/actions/actionCreator";
import TalkButton from "../components/Talk";
import { useLocation } from "react-router-dom";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const dispatch = useDispatch();

  const { dresses } = useSelector((state) => state?.dress);
  const { isLoading } = useSelector((state) => state?.dress);

  const location = useLocation();

  useEffect(() => {
    dispatch(storesFetch())
      .then(() => {
        dispatch(dressesFetch());
      })
      .catch((error) => {
        // console.error("Error fetching stores or dresses:", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dresses]);

  const { data } = dresses;
  const { pagination } = dresses;

  const nextPageHandler = (event, page) => {
    event.preventDefault();
    dispatch(dressesFetch({ page }));
  };

  const backPageHandler = (event, page) => {
    event.preventDefault();
    dispatch(dressesFetch({ page }));
  };

  return (
    <>
      <TalkButton />
      <Carousel />
      {isLoading && <Loading />}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mx-20"
        style={{ position: "relative", top: "-20px" }}
      >
        {data?.map((dress) => (
          <Card dress={dress} key={dress?.id} />
        ))}
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

export default HomePage;
