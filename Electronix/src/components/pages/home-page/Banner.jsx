import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import bannerData from "./bannerData";
import "./Banner.css";

const Banner = () => {
  return (
    <Carousel
      fade
      interval={4000}
      controls={true}
      indicators={true}
      pause={false}
      className="banner-carousel"
    >
      {bannerData.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100 banner-img"
            src={item.image}
            alt={item.title}
          />
          <Carousel.Caption className="banner-caption">
            

          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
