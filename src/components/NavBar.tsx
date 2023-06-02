import React, { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { getProductList } from "../redux/store/products/productActions";

type Props = {};

const NavBar = (props: Props) => {
  const dispatch = useAppDispatch();

  const setSearchTerm = (e: any, timeoutId: any) => {
    const searchTerm = e.target.value;

    // Clear the previous timeout if exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Set a new timeout to make the API call after 200 milliseconds
    const newTimeoutId = setTimeout(() => {
      dispatch(getProductList({ name: searchTerm }));
    }, 200);

    return newTimeoutId;
  };
  return (
    <>
      <nav className="h-10 bg-blue-700 sticky top-0 left-0 w-full grid grid-cols-1 sm:grid-cols-3">
        <div className="col-span-1 text-center flex items-center justify-center">
          <h4 className="text-white font-bold font-serif text-2xl">
            Eteration
          </h4>
        </div>
        <div className="col-span-3 sm:col-span-1 rounded-md flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none w-full"
            onChange={setSearchTerm}
          />
        </div>
        <div className="col-span-1 text-center flex items-center justify-center">
          <h4 className="text-white font-serif">Basket</h4>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
