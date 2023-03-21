import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Wrapper from "@/components/Wrapper";
import ProductCard from "@/components/homepage/ProductCard";
import { fetchDataFromApi } from "@/utils/api";
import useSWR from "swr";
import Image from "next/image";
const maxResult = 3;

const Search = () => {
  const { query } = useRouter();
  const [products, setProducts] = useState();
  const [pageIndex, setPageIndex] = useState(1);

  const fetchingProducts = async () => {
    console.log(query.slug);
    const { data } = await fetchDataFromApi(
      `/api/products?populate=*&[filters][name][$containsi]=${query.slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
    );
    setProducts(data);
  };

  // for next page data
  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][name][$containsi]=${query.slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    { fallbackData: products }
  );

  useEffect(() => {
    fetchingProducts();
    setPageIndex(1);
  }, [query]);
  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        {data?.meta?.pagination?.total > 0 && (
          <>
            <div className="text-center mx-w-[800px] mx-auto mt-8 md:mt-0 ">
              <div className="text-[28px] md:text-[340x] mb-5 font-semibold leading-tight uppercase">
                {query.slug}
              </div>
            </div>
            {/* products grid start */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-14 px-5 md:px-0 ">
              {data?.data?.map((item) => (
                <ProductCard key={item.id} data={item} />
              ))}
            </div>
            {/* products grid end */}
          </>
        )}
        {/* PAGINATION BUTTONS START */}
        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data?.meta?.pagination?.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={
                pageIndex === (data && data?.meta?.pagination?.pageCount)
              }
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {/* PAGINATION BUTTONS END */}
        {isLoading && (
          <div className="absolute top-0 my-25 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}

        {/* no result found start*/}
        {data?.meta?.pagination?.total === 0 && (
          <>
            <div className="flex-[2] flex flex-col items-center pb-[50px]">
              <Image
                src="/empty-cart.jpg"
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
                alt={`no Result found`}
              />
              <span className="text-xl font-bold">No Result Found</span>
            </div>
          </>
        )}
        {/* no result found end */}
      </Wrapper>
    </div>
  );
};

export default Search;
