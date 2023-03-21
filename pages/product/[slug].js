import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/utils/api";
import { getPercentageOff } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

// redux store
import { addToCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

// pop up message using react/testify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const ProductDetails = ({ product, products }) => {
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  // simplyfing the products
  const p = product?.data?.[0]?.attributes;

  // pop up message method
  const notify = () => {
    toast.success("Success. Check Your Cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const { query } = useRouter();
  useEffect(() => {
    setSelectedSize();
  }, [query]);

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px] ">
          {/* left Colum Start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0 ">
            <ProductDetailsCarousel images={p?.image} />
          </div>
          {/* left Colum end */}

          {/* Right Colum Start */}
          <div className="flex-[1] py-3">
            {/* product Title */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p?.name}
            </div>
            {/* product subTitle */}

            {p?.subtitle && (
              <div className="text-lg font-semibold mb-5">{p?.subtitle}</div>
            )}
            {/* product Price */}
            <div className="flex item-center">
              <p className="mr-2 text-lg font-semibold">&#8377;{p?.price}</p>
              {p?.original_price && (
                <React.Fragment>
                  <p className="text-base font-medium line-through">
                    &#8377;{p?.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getPercentageOff(p?.original_price, p?.price)}% off
                  </p>
                </React.Fragment>
              )}
            </div>
            <div className="text-md font-medium text-black/[0.5]">
              inc. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20 ">{`(Also includes all applicable duties)`}</div>
            {/* product price end */}

            {/* product size range start */}
            <div className="mb-10">
              {/* heading start */}
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5]">
                  Select Guide
                </div>
              </div>
              {/* heading end */}
              {/* size start */}

              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p?.size?.data?.map((item, index) => (
                  <div
                    key={index}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed bg-black/[0.1] opacity-50"
                    } ${selectedSize === item.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(item.size);
                      setShowError(false);
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
              {/* size end */}
              {/* Show error message start */}
              {showError && (
                <div className="text-red-600 mt-1">
                  Size Selection is required*
                </div>
              )}
              {/* Show error message end */}
            </div>
            {/* product size range end */}
            {/* button start*/}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      selectedSize,
                    })
                  );
                  notify();
                }
              }}
            >
              Add To Cart
            </button>
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              WhishList <IoMdHeartEmpty size={20} />
            </button>
            {/* button end*/}
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="text-md mb-5 markdown">
                <ReactMarkdown>{p.description}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* Right Colum end */}
        </div>
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

// api calls

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");

  const paths = products?.data?.map((item) => ({
    params: {
      slug: item?.attributes?.slug,
      // categories: item.attributes.categories.data[0].attributes.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const products = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$ne]=${slug}`
  );
  return {
    props: {
      product,
      products,
    },
  };
}
