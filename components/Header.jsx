import Link from "next/link";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import Wrapper from "./Wrapper";
import Search from "./Search";

// icons

import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart, BsSearch } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import { fetchDataFromApi } from "@/utils/api";

// redex store
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategoreis] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  // getting cartItems from redux store
  const { cartItems } = useSelector((state) => state.cart);

  // navbar controll
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("tranlate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // Fetching the categories data
  const fetchCategoreis = async () => {
    const { data } = await fetchDataFromApi(`/api/categories?populate=*`);
    setCategoreis(data);
  };
  useEffect(() => {
    fetchCategoreis();
  }, []);
  return (
    <>
      <header
        className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
      >
        <Wrapper className="h-[60px] flex justify-between items-center">
          <Link href={"/"}>
            <img src="/logo.svg" alt="" className="w-[40px] md:w-[60px]" />
          </Link>
          <Menu
            categories={categories}
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
          />

          {mobileMenu && (
            <MenuMobile
              showCatMenu={showCatMenu}
              setShowCatMenu={setShowCatMenu}
              setMobileMenu={setMobileMenu}
              categories={categories}
            />
          )}
          <div className="flex items-center gap-2 text-black">
            {/* heart icon start */}
            <div className="w-8 md:w-12 h-8 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
              <IoMdHeartEmpty className="text-[19] md:text-[24px]" />
              <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">
                51
              </div>
            </div>
            {/* hert icon end */}

            {/* Search icon start */}
            <div
              className="w-8 md:w-12 h-8 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative duration-500"
              onClick={() => setShowSearch(!showSearch)}
            >
              <BsSearch className="text-[19] md:text-[24px]" />
            </div>
            {/* search icon end */}

            {/* cart icon start */}
            <Link href="/cart">
              <div className="w-8 md:w-12 h-8 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
                <BsCart className="text-[15] md:text-[20px]" />
                {cartItems?.length > 0 && (
                  <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px] ">
                    {cartItems?.length}
                  </div>
                )}
              </div>
            </Link>
            {/* cart icon end */}

            {/* mobile icon start */}
            <div className="w-8 md:w-12 h-8 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer">
              {mobileMenu ? (
                <VscChromeClose
                  className="text-[16px]"
                  onClick={() => setMobileMenu(false)}
                />
              ) : (
                <BiMenuAltRight
                  className="text-[20px]"
                  onClick={() => setMobileMenu(true)}
                />
              )}
            </div>
            {/* mobile menu end */}
          </div>
        </Wrapper>
      </header>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
