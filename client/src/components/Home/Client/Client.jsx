import React from "react";
import Heading from "../../util/Heading/Heading";
import { comments } from "./data";
import Slide from "./Slide";
import Slider from "react-slick";
import { settings } from "./Slider";
import "./Slider.css";

const Client = () => {
  const slide = comments.map((slides, i) => <Slide slide={slides} key={i} />);
  return (
    <div>
      <Heading
        tag="Clients Say About Us"
        title="Candidates Testimonials"
        shadow="client say about us"
        desc="Lorem Ipsum is simply dummy text printing and type setting 
        industry Lorem Ipsum been industry standard dummy text ever since
         when unknown printer took a galley."
      />
      <div className="my-4">
        <Slider {...settings}>{slide}</Slider>
      </div>
    </div>
  );
};

export default Client;
