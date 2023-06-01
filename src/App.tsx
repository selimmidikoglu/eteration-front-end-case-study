import { useEffect, useMemo } from "react";
import "./App.css";
import { getProductList } from "./redux/store/products/productActions";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./redux/store";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import Filter from "./components/Filter";
import Basket from "./components/Basket";

function App() {
  const dispatch = useAppDispatch();
  const {
    loading,
    brandFilteredProducts,
    defaultProducts,
    currentPage,
    modelFilteredProducts,
  } = useSelector((state: RootState) => state.productSlice);

  useEffect(() => {
    dispatch(getProductList());
  }, []);

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
    <div className="min-h-screen">
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
          />
        </div>
        <div className="col-span-1 text-center flex items-center justify-center">
          <h4 className="text-white font-serif">Basket</h4>
        </div>
      </nav>
      <section className="w-full m-h-full grid grid-flow-row grid-cols-5 bg-gray-100 pt-10">
        <Filter />
        <section className="col-span-3 flex flex-wrap flex-row justify-evenly">
          {choosePage()}

          <Pagination />
        </section>
        <Basket />
      </section>
    </div>
  );
}

export default App;
