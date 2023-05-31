import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { getProductList } from "./redux/store/products/productActions";

function App() {
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getProductList());
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-2xl text-blue-600">SETUP DONE!</h1>
    </div>
  );
}

export default App;
