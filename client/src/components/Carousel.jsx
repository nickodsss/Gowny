import React from "react";
import { Carousel } from "react-responsive-carousel";
import pic from "../assets/Screenshot 2023-07-27 at 14.19.14.png";

export default () => (
  <div style={{ position: "relative", top: "-64px" }}>
    <Carousel
      autoPlay
      showThumbs={false}
      thumbWidth="5%"
      thumbHeight="5%"
      showStatus={false}
      transitionTime={10}
      style={{ height: "600px" }}
      backgroundPosition="center"
    >
      <div>
        <img
          alt=""
          className="object-cover h-30 w-full"
          style={{ height: "650px", width: "full", filter: "brightness(90%)" }}
          src={pic}
        />
      </div>
      <div>
        <img
          className="object-cover h-30 w-full"
          alt=""
          style={{ height: "650px", width: "full", filter: "brightness(90%)" }}
          src="https://www.estylecdn.com/manufcols/pronovias/current/zoom/ILONA_B.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          className="object-cover h-30 w-full"
          style={{ height: "650px", width: "full", filter: "brightness(90%)" }}
          src="https://media.discordapp.net/attachments/1095178474823626883/1136238120149458976/Your_paragraph_text_2.jpg?width=1820&height=1138"
        />
      </div>
    </Carousel>
  </div>
);
