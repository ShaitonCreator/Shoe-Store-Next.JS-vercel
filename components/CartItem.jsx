import React from "react";
import { apiUrl } from "@/utils/urls";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

import { removeFromCart, updateCart } from "@/store/cartSlice";
import Link from "next/link";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  const updateCartItem = (event, key) => {
    let payload = {
      key,
      value:
        key === "quantity" ? parseInt(event.target.value) : event.target.value,
      id: data.id,
    };
    dispatch(updateCart(payload));
  };

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* image Start */}
      <Link
        href={`/product/${data?.attributes?.slug}`}
        className="shrink-0 aspect-square w-[50px] md:w-[120px]"
      >
        <Image
          width={120}
          height={120}
          src={data?.attributes?.thumbnail?.data?.attributes?.url}
          alt={data?.attributes?.name}
        />
      </Link>
      {/* image end */}
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          {/* product title */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {data?.attributes?.name}
          </div>
          {/* product subTitle */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {data?.attributes?.subtitle}
          </div>
          {/* product price */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : ₹ {data?.totalPrice}
          </div>
        </div>
        {/* product subtitle for desktop */}
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {data?.attributes?.subtitle}
        </div>
        {/* selectors */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.7] text-sm md:text-md">
            {/* size selector */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="hover:text-black"
                onChange={(event) => updateCartItem(event, "selectedSize")}
              >
                {data?.attributes?.size?.data?.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.size}
                      disabled={!item.enabled ? true : false}
                      selected={data.selectedSize === item.size}
                    >
                      {item.size}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* quantity selector */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="hover:text-black"
                onChange={(event) => updateCartItem(event, "quantity")}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map(
                  (item, index) => (
                    <option
                      key={index}
                      value={item}
                      selected={data.quantity === item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          {/* delete icon */}
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
            onClick={() => dispatch(removeFromCart({ id: data.id }))}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
