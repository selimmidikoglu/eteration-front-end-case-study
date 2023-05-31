import { useEffect, useState, useMemo } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getProductList } from "./redux/store/products/productActions";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Product } from "./types/productTypes";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

function App() {
  const [page, setPage] = useState<number>(0);
  const dispatch: any = useDispatch();
  const { loading, products } = useSelector(
    (state: RootState) => state.productSlice
  );
  const choosePage = (memoizedProducts: Product[]): any => {
    memoizedProducts
      .slice(page * 12, (page + 1) * 12)
      .map((product) => <ProductCard product={product} />);
  };

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  const memoizedProducts = useMemo(() => products, [products]);

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
      <section className="w-full m-h-full grid grid-flow-row grid-cols-5 bg-gray-100">
        {/* First section for modals, companies and stuff */}
        <section className="col-span-1 "></section>
        <section className="col-span-3  flex flex-wrap flex-row">
          {products &&
            memoizedProducts
              .slice(page * 12, (page + 1) * 12)
              .map((product) => <ProductCard product={product} />)}
          <Pagination />
        </section>
        <section className="col-span-1 "></section>
      </section>
    </div>
  );
}

export default App;
