import React, { useState } from "react";
import logo from "../assets/Screenshot_2023-07-27_at_17.11.04-removebg-preview.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dressesFetch } from "../stores/actions/actionCreator";
import { createSpeechlySpeechRecognition } from "@speechly/speech-recognition-polyfill";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const appId = "7aa4dc07-dc99-4bc5-b13f-32356aee776c";
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
// ----- MENUBAR ---- //
import { useEffect } from "react";
import { categoryFetch, storesFetch } from "../stores/actions/actionCreator";

function Navbar() {
  //untuk search bar
  const { pathname } = useLocation();
  const [isCollapsed, setCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const toggleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const dispatch = useDispatch();

  const handleSearchSubmit = () => {
    dispatch(dressesFetch({ name: searchQuery }));
    setSearchQuery("");
  };

  const [activeLabel, setActiveLabel] = useState(null);
  const navigate = useNavigate();

  const logoClick = () => {
    dispatch(dressesFetch());
    navigate("/");
  };

  // ----- VOICE ----- //
  if (!browserSupportsSpeechRecognition) {
  }

  const handleMouseDown = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setSearchQuery(transcript);
      handleSearchSubmit();
      SpeechRecognition.stopListening();
      resetTranscript();
    }, 200);
  };

  const handleStartStopClick = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setTimeout(() => {
        dispatch(dressesFetch({ name: transcript }));

        resetTranscript();
      }, 200);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  // ---- MENUBAR ----//

  // GRADE, CATEGORY, NAMA STORE

  useEffect(() => {
    dispatch(categoryFetch());
    dispatch(storesFetch());
  }, []);

  const { categories } = useSelector((state) => state?.category);
  const { stores } = useSelector((state) => state?.store);

  const handleCategoryClick = (e, CategoryId) => {
    e.preventDefault();
    dispatch(dressesFetch({ CategoryId }));
  };

  const handleGradeClick = (e, grade) => {
    e.preventDefault();
    dispatch(dressesFetch({ grade }));
  };

  const handleStoreClick = (e, StoreId) => {
    e.preventDefault();
    dispatch(dressesFetch({ StoreId }));
  };

  const [dropdownOpenGrade, setDropdownOpenGrade] = useState(true);
  const [dropdownOpenCategory, setDropdownOpenCategory] = useState(true);
  const [dropdownOpenStore, setDropdownOpenStore] = useState(true);

  useEffect(() => {
    dispatch(categoryFetch());
    dispatch(storesFetch());
  }, []);

  const handleDropdownToggleGrade = () => {
    setDropdownOpenGrade(!dropdownOpenGrade);
  };

  const handleDropdownToggleCategory = () => {
    setDropdownOpenCategory(!dropdownOpenCategory);
  };

  const handleDropdownToggleStore = () => {
    setDropdownOpenStore(!dropdownOpenStore);
  };

  //----NAVBAR SHOWING----//
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const role = localStorage.getItem("role");
  let { isLogin } = useSelector((state) => state?.user);
  const access_token = localStorage.getItem("access_token");
  if (access_token && access_token !== "undefined") {
    isLogin = true;
  }

  return (
    <>
      <div
        className={`w-full top-0 z-28 flex items-center justify-between bg-[#DDD9CE] ${
          showNavbar ? "sticky top-0" : "sticky -top-20"
        }`}
        style={{
          width: "100%",
          top: "0",
          zIndex: "30",
          position: "sticky",
          visibility: showNavbar ? "visible" : "hidden",
          transition: "visibility 0.s, top 0.3s",
          background: "#DDD9CE",
        }}
      >
        <div className="cursor-pointer focus-outline">
          <img
            onClick={logoClick}
            src={logo}
            style={{ width: "60px", height: "50px", marginBottom: "10px" }}
            alt="Logo"
          />
        </div>

        {pathname === "/" && (
          <>
            <div
              style={{
                position: "sticky",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: "1",
              }}
            >
              <div className="flex justify-center p-4">
                <button className="dropdown mx-8 z-10">
                  <details open={dropdownOpenGrade}>
                    <summary
                      className={`m-1 bg-[#DDD9CE] flex items-center cursor-pointer ${
                        activeLabel === "grade" ? "underline" : ""
                      }`}
                      onClick={handleDropdownToggleGrade}
                    >
                      GRADE
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-4 h-4 ml-1 ${
                          dropdownOpenGrade ? "transform rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a onClick={(e) => handleGradeClick(e, "S")}>S</a>
                      </li>
                      <li>
                        <a onClick={(e) => handleGradeClick(e, "A")}>A</a>
                      </li>
                      <li>
                        <a onClick={(e) => handleGradeClick(e, "B")}>B</a>
                      </li>
                      <li>
                        <a onClick={(e) => handleGradeClick(e, "C")}>C</a>
                      </li>
                    </ul>
                  </details>
                </button>

                <button className="dropdown mx-8 z-10">
                  <details open={dropdownOpenCategory}>
                    <summary
                      className={`m-1 bg-[#DDD9CE] flex items-center cursor-pointer ${
                        activeLabel === "category" ? "underline" : ""
                      }`}
                      onClick={handleDropdownToggleCategory}
                    >
                      CATEGORY
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-4 h-4 ml-1 ${
                          dropdownOpenCategory ? "transform rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-[#EFECE9] rounded-box w-52"
                    >
                      {categories.map((el) => (
                        <li key={el.id}>
                          <a onClick={(e) => handleCategoryClick(e, el.id)}>
                            {el.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </button>

                <button
                  className="dropdown mx-8 z-10"
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <details open={dropdownOpenStore}>
                    <summary
                      className={`m-1 bg-[#DDD9CE] flex items-center cursor-pointer ${
                        activeLabel === "store" ? "underline" : ""
                      }`}
                      onClick={handleDropdownToggleStore}
                    >
                      STORE
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-4 h-4 ml-1 ${
                          dropdownOpenStore ? "transform rotate-180" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-100"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "500px",
                        left: "10",
                        gap: "5px",
                        flexWrap: "wrap",
                        marginTop: "8px",
                        marginLeft: "-40px",
                      }}
                    >
                      {stores?.map((el) => (
                        <li key={el.id}>
                          <a
                            onClick={(e) => handleStoreClick(e, el.id)}
                            style={{
                              padding: "10px 20px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {el.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </button>
                {role !== "Admin" && isLogin && (
                  <NavLink to={"favorite"}>
                    <button className="mx-8 mt-1">MY FAVORITE</button>
                  </NavLink>
                )}
              </div>
            </div>

            <div className="bg-[#DDD9CE] flex justify-end mr-8 ">
              {isCollapsed ? (
                <div className="relative mx-auto w-96">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border border-[#050505]  w-full py-2 pl-4 pr-10 text-[#050505] placeholder-[#DDD9CE]-50 focus:outline-none focus:ring-1 "
                    placeholder="Search"
                    style={{ background: "#EFECE9", borderRadius: "4px" }}
                  />
                  <button
                    onClick={handleSearchSubmit}
                    className="flex absolute right-0 top-0 mt-2 my-2 mx-2 focus:outline-none bg-[#EFECE9]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <button onClick={handleStartStopClick} className="mr-2">
                      {isListening ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={isListening ? "red" : "#050505"}
                          strokeWidth="1.5"
                          className="h-6 w-6"
                        >
                          <circle cx="12" cy="12" r="10" />
                          {isListening && (
                            <circle cx="12" cy="12" r="5" fill="red" />
                          )}
                          <path d="M12 16v-8M10 7h4" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                          />
                        </svg>
                      )}
                    </button>
                  </button>
                  <button
                    onClick={toggleCollapse}
                    className="absolute left-72 top-0 mt-2 mr-14 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button onClick={toggleCollapse}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
