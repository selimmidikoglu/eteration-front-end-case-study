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
    <div className="min-h-screen">
      <NavBar />
      <section className="w-full m-h-full grid grid-flow-row grid-cols-5 bg-gray-100 pt-10">
        <Filter />
        <ProductList />
        <Basket />
      </section>
    </div>
  );
}

export default App;
