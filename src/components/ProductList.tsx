import { useEffect, useMemo } from "react";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../redux/store";

type Props = {};

const ProductList = (props: Props) => {
  const dispatch = useAppDispatch();
  const {
    loading,
    brandFilteredProducts,
    defaultProducts,
    currentPage,
    modelFilteredProducts,
  } = useSelector((state: RootState) => state.productSlice);

  const memoizedProducts = useMemo(() => defaultProducts, [defaultProducts]);

  const choosePage = () => {
    if (modelFilteredProducts.length > 0) {
      return modelFilteredProducts
        .slice((currentPage - 1) * 12, currentPage * 12)
        .map((product) => <ProductCard key={product.id} product={product} />);
    }
    if (brandFilteredProducts.length > 0) {
      return brandFilteredProducts
        .slice((currentPage - 1) * 12, currentPage * 12)
        .map((product) => <ProductCard key={product.id} product={product} />);
    }

    return memoizedProducts
      .slice((currentPage - 1) * 12, currentPage * 12)
      .map((product) => <ProductCard key={product.id} product={product} />);
  };

  return (
    <>
      <section className="col-span-3 flex flex-wrap flex-row justify-evenly">
        {choosePage()}

        <Pagination />
      </section>
    </>
  );
};

export default ProductList;
