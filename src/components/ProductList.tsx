import { useMemo } from "react";
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
    selectedBrand,
    selectedSortBy,
    selectedModel,
  } = useSelector((state: RootState) => state.productSlice);

  // const memoizedProducts = useMemo(() => defaultProducts, [defaultProducts]);

  const choosePage = () => {
    let filteredProducts = defaultProducts;

    if (selectedModel !== "") {
      filteredProducts = modelFilteredProducts;
    } else if (selectedBrand !== "") {
      filteredProducts = brandFilteredProducts;
    }

    if (selectedSortBy !== "" && selectedBrand !== "") {
    } else if (selectedSortBy !== "") {
    }

    return filteredProducts
      .slice((currentPage - 1) * 12, currentPage * 12)
      .map((product) => <ProductCard key={product.id} product={product} />);
  };

  return (
    <>
      {choosePage()}
      <Pagination />
    </>
  );
};

export default ProductList;
