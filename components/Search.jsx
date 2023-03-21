import React, { useState } from "react";
import Wrapper from "./Wrapper";

// icons
import { BsSearch } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

const Search = ({ setShowSearch }) => {
  const [input, setInput] = useState("");

  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Wrapper>
      <div className="h-full absolute z-30 bg-[#ede3e4]/[0.8] w-full top-0 left-0">
        <form action={`/search/${input}`}>
          <label className="relative flex justify-center md:my-3">
            {/* <span className="sr-only">Search</span> */}
            <div className="relative">
              <span className="relative top-7 md:top-12 left-2 opacity-50">
                {/* <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg> */}
                <BsSearch className="text-2xl md:text-4xl" />
              </span>
              <input
                className="h-8 md:h-16 placeholder:text-slate-400 block bg-white w-[60vw] border border-slate-300 rounded-md py-2 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-lg"
                placeholder="Search for anything..."
                type="text"
                name="search"
                value={input}
                onChange={handleOnChange}
                autoFocus={true}
              />
            </div>
            <div
              className="flex items-center justify-center mx-2 md:mx-5 my-2 md:my-5 h-8 md:h-16 relative top-4 opacity-50 bg-white border-black hover:shadow-lg hover:opacity-80"
              onClick={() => setShowSearch(false)}
            >
              <VscChromeClose size={35} className="opacity-80 z-10" />
            </div>
          </label>
          <button type="submit" className="hidden"></button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Search;
