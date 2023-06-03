import { useEffect } from "react";
import "./App.css";
import { getProductList } from "./redux/store/products/productActions";
import Filter from "./components/Filter";
import Basket from "./components/Basket";
import NavBar from "./components/NavBar";
import ProductList from "./components/ProductList";
import { useAppDispatch } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductList(null));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <section className="container  w-full h-full grid grid-cols-1 lg:grid-cols-5 bg-gray-100 pt-10 mx-auto">
        <section className="h-fit col-span-1 lg:col-span-1   grid grid-cols-3">
          <Filter />
        </section>
        <section className="col-span-1  lg:col-span-3  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
          <ProductList />
        </section>
        <Basket />
      </section>
    </div>
  );
}

export default App;
