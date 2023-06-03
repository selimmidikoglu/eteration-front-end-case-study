import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../redux/store";
import { setCurrentPageAndTotalNumberOfPages } from "../redux/store/products/productSlice";
import { getTotalPageCount } from "../helpers/product/productPageNumberCreationHelpers";
import { useEffect, useState } from "react";
import { Product } from "../types/productTypes";

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const setProductList = (defaultProducts: Product[]) => {
    let filtered = defaultProducts;

    if (selectedModel !== "") {
      filtered = modelFilteredProducts;
      return filtered;
    }
    if (selectedSortBy !== "" || selectedBrand !== "") {
      return filtered;
    }
    return filtered;
  };
  useEffect(() => {
    const filtered = setProductList(defaultProducts);
    setTotalPageNumber(getTotalPageCount(filtered.length ?? 0));
    setFilteredProducts(filtered);
  }, [defaultProducts, modelFilteredProducts, brandFilteredProducts]);

  return (
    <>
      {filteredProducts
        .slice((currentPage - 1) * 12, currentPage * 12)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      <Pagination totalPageNumber={totalPageNumber} />
    </>
  );
};

export default ProductList;
