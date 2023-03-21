import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { apiUrl } from "@/utils/urls";

const ProductDetailsCarousel = ({ images }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px] ">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.data?.map((elem) => (
          <img key={elem?.id} src={elem?.attributes?.url} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
