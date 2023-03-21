import { getPercentageOff } from "@/utils/helper";
import { apiUrl } from "@/utils/urls";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ data: { attributes } }) => {
  return (
    <Link
      href={`/product/${attributes?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        width={500}
        height={500}
        src={attributes?.thumbnail.data.attributes.url}
        alt={attributes?.name}
      />
      <div className="text-lg font-medium">{attributes?.name}</div>
      <div className="flex items-center text-black/[0.5]">
        <p className="mr-2 text-lg font-semibold">&#8377;{attributes.price}</p>
        {attributes.original_price && (
          <React.Fragment>
            <p className="text-base font-medium line-through">
              &#8377;{attributes.original_price}
            </p>
            <p className="ml-auto text-base font-medium text-green-500">
              {getPercentageOff(attributes.original_price, attributes.price)}%
              off
            </p>
          </React.Fragment>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
