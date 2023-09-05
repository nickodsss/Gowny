import React, { useState } from "react";
import logo from "../assets/Screenshot_2023-07-27_at_17.11.04-removebg-preview.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dressesFetch } from "../stores/actions/actionCreator";
//these 5 units 
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const appId = '7aa4dc07-dc99-4bc5-b13f-32356aee776c';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
function Navbar() {
    //untuk search bar

    const [isCollapsed, setCollapsed] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);



    const toggleCollapse = () => {
        setCollapsed((prevCollapsed) => !prevCollapsed);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const dispatch = useDispatch()



    // dropdown profile
    const [activeLabel, setActiveLabel] = useState(null);

    const handleFocus = (label) => {
        setActiveLabel(label);
    };

    const handleBlur = () => {
        setActiveLabel(null);
    };

    const navigate = useNavigate()

    const logoClick = () => {
        dispatch(dressesFetch())
        navigate("/")
    }

    if (!browserSupportsSpeechRecognition) {
        console.log("Browser doesn't support speech recognition.");
    }

    const handleMouseDown = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
    };

    const handleMouseUp = () => {
        // Wait for a brief moment to ensure the transcript is updated
        setTimeout(() => {
            console.log("Transcript before search:", transcript);
            setSearchQuery(transcript);
            handleSearchSubmit();
            SpeechRecognition.stopListening(); // Stop listening after handling the search
            resetTranscript();
        }, 200); // Adjust the delay as needed
    };

    const handleStartStopClick = () => {
        if (isListening) {
            SpeechRecognition.stopListening(); // Stop listening
            // Wait for a brief moment to ensure the transcript is updated
            setTimeout(() => {
                console.log("Transcript before search:", transcript);
                dispatch(dressesFetch({ name: transcript }))
                // setSearchQuery(transcript);
                // handleSearchSubmit();
                resetTranscript();
            }, 200); // Adjust the delay as needed
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true }); // Start listening
        }
        setIsListening(!isListening);
    };

    const handleSearchSubmit = () => {
        // Implement your search logic here, e.g., perform an API call to fetch search results
        console.log("Searching for:", searchQuery);
        dispatch(dressesFetch({ name: searchQuery }))
        setSearchQuery("");

        // Optionally, you can toggleCollapse() here if you want to automatically collapse the search bar after search
    };


    return (
        <>
            <div className="sticky w-full top-0 z-30 flex items-center justify-between bg-[#EFECE9] p-1 border border-[#050505] ">
                {/* <NavLink to={"/"}> */}
                <div style={{ width: "60px", height: "50px", marginBottom: "10px" }}>
                    <img onClick={logoClick} src={logo} />
                </div>
                {/* </NavLink> */}

                {/* search bar */}
                <div className="bg-[#EFECE9] flex justify-end ">
                    {isCollapsed ? (
                        <div className="relative mx-auto w-96">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="border border-[#050505]  w-full py-2 pl-4 pr-12 text-[#050505] placeholder-[#DDD9CE]-50 focus:outline-none focus:ring-1"
                                placeholder="Search"
                                style={{ background: "#EFECE9" }}
                            />
                            <button
                                onClick={handleSearchSubmit}
                                className="absolute right-0 top-0 mt-2 mr-2 focus:outline-none bg-[#EFECE9]"
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
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={toggleCollapse}
                                className="absolute right-0 top-0 mt-2 mr-12 focus:outline-none"
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
                                        strokeWidth="1"
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
                    <button onClick={handleStartStopClick}>
                        {isListening ? 'Stop' : 'Start'}
                    </button>
                    <span style={{ visibility: 'hidden' }}>{listening ? 'Listening...' : ''}</span> {/* Hidden listening state */}
                    {/* ...Favourite button... */}
                    {/*favourite */}
                    <button className="mx-2">
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
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Navbar;