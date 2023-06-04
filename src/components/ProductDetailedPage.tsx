import { useEffect } from "react";
import NavBar from "./NavBar";

import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../redux/store";
import { getProductById } from "../redux/store/products/productActions";
import Basket from "./Basket";
import { useSelector } from "react-redux";
import { addToBasket } from "../redux/store/basket/basketSlice";
import { Product } from "../types/productTypes";

type Props = {};

const ProductDetailedPage = (props: Props) => {
  const { product_id } = useParams();
  const { selectedProduct } = useSelector((state: RootState) => state.productSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (product_id) {
      dispatch(getProductById({ id: product_id }));
    }
  }, []);

  const addProductToBasket = (product: Product) => {
    dispatch(addToBasket(product));
  };
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto w-full grid grid-cols-4 pt-10 h-full">
          <section className="detailed-product-container xl:col-span-3 sm:col-span-4 col-span-4 grid grid-cols-3 shadow-lg bg-white xl:mr-10">
            <div className="xl:col-span-2 lg:col-span-2 sm:col-span-3 col-span-3 flex items-center justify-center p-3">
              <img src={selectedProduct?.image} className="w-full h-full"></img>
            </div>
            <div className="xl:col-span-1 lg:col-span-1 sm:col-span-3 col-span-3 p-3">
              <p className="text-black font-400 text-lg ">{selectedProduct?.name}</p>
              <p className="text-blue-600 font-500 text-lg mb-20 mt-1">{selectedProduct?.price} &#8378;</p>

              <button className="bg-blue-600 w-full h-9 text-white rounded mb-4" onClick={() => addProductToBasket(selectedProduct)}>
                Add to cart
              </button>

              <p className="font-normal text-sm leading-5 overflow-hidden w-auto h-auto ">{selectedProduct?.description}</p>
            </div>
          </section>
          <section className="xl:col-span-1 sm:col-span-4 col-span-4">
            <Basket />
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductDetailedPage;
