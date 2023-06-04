import React, { useEffect, useState } from "react";
import { useAppDispatch, RootState } from "../redux/store";
import { getProductList } from "../redux/store/products/productActions";
import { BsBasket3Fill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { setSearchTerm } from "../redux/store/products/productSlice";
import { setUrlQueryStrings } from "../helpers/apiHelpers/productApiHelpers";
import { MdOutlinePersonOutline } from "react-icons/md";
type Props = {};

const toCurrency = (price: number) => {
  let formattedOutput = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  });
  return formattedOutput.format(price);
};

const NavBar = (props: Props) => {
  const dispatch = useAppDispatch();
  const totalPrice = useSelector((state: RootState) => state.basketSlice.totalPrice);
  const [timeOutId, setTimeOutID] = useState<any>();
  const { selectedSortBy, selectedBrand } = useSelector((state: RootState) => state.productSlice);

  const setSearchTermCurrent = (e: any) => {
    const searchTerm = e.target.value;
    dispatch(setSearchTerm(searchTerm));
    // Clear the previous timeout if exists
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    // Set a new timeout to make the API call after 200 milliseconds

    const newTimeoutId = setTimeout(() => {
      const param = {
        selectedBrand: selectedBrand,
        selectedSortBy: selectedSortBy,
        searchTerm: searchTerm,
      };
      const { params, condition } = setUrlQueryStrings(param);

      dispatch(getProductList(params));
    }, 200);
    setTimeOutID(newTimeoutId);
  };
  return (
    <>
      <nav className="h-10 bg-blue-700 sticky top-0 left-0 w-full  flex">
        <div className="flex-1 text-center flex items-center justify-center">
          <h4 className="text-white font-bold text-2xl">Eteration</h4>
        </div>
        <div className="flex-1  rounded-md flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md py-1 px-4 focus:outline-none w-full"
            onChange={setSearchTermCurrent}
          />
        </div>
        <div className="flex-1 text-center flex items-center justify-center flex-row">
          <div className="flex">
            <BsBasket3Fill color="white" size={20} />
            <span className="ml-3 total-price text-white font-bold">{toCurrency(totalPrice)}</span>
          </div>
          <div className="flex ml-5">
            <MdOutlinePersonOutline color="white" size={20} />
            <span className="total-price text-white font-bold font-400">Kerem</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
