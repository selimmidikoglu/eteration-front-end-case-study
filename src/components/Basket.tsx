import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/basket.css";
type Props = {};

const Basket = (props: Props) => {
  const { selectedProducts } = useSelector(
    (state: RootState) => state.basketSlice
  );
  return (
    <section className="col-span-1 flex flex-col items-start justify-start">
      <h6 className="basket-title">Basket</h6>
      <div className="basket-wrapper bg-white w-60">
        {selectedProducts.length > 0 &&
          selectedProducts.map((product) => (
            <div className="w-full max-h-40 flex items-center justify-evenly p-5">
              <div className="product-info-container flex-2">
                <p className="product-info-name mb-1">{product.product.name}</p>
                <p className=" product-info-price font-medium text-xs leading-4 flex items-center text-blue-600">
                  {product.product.price} &#8378;
                </p>
              </div>
              <div className="product-info-container flex-2">
                <p className="product-info-name mb-1">{product.product.name}</p>
                <p className=" product-info-price font-medium text-xs leading-4 flex items-center text-blue-600">
                  {product.product.price} &#8378;
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Basket;
