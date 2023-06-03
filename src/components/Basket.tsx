import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import "../styles/basket.css";
import { changeQuantity } from "../redux/store/basket/basketSlice";
import { useNavigate } from "react-router-dom";
type Props = {};

const Basket = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProducts, totalPrice } = useSelector((state: RootState) => state.basketSlice);

  const changeQuantityProduct = (id: number, operation: string) => {
    dispatch(changeQuantity({ id, operation }));
  };
  return (
    <section className="col-span-1 flex flex-col items-start justify-start">
      <h6 className="basket-title">Cart</h6>
      <div className="cart-wrapper bg-white w-full mb-10">
        {selectedProducts &&
          selectedProducts.length > 0 &&
          selectedProducts.map((product, id) => (
            <div key={`basket-product-${id}`} className="w-full max-h-40 grid grid-cols-4 sm:grid-cols-4 p-2 mt-2">
              <div className="product-info-container col-span-2 flex flex-col item-start justify-start">
                <p className="product-info-name mb-1">{product.product.name}</p>
                <p className=" product-info-price font-medium text-xs leading-4 flex items-center text-blue-600">{product.product.price} &#8378;</p>
              </div>
              <div className="col-span-2 grid grid-cols-3 mx-auto">
                <button
                  className="col-span-1 flex items-center justify-center quantity-changer"
                  onClick={() => changeQuantityProduct(id, "decrease")}
                >
                  -
                </button>
                <span className="col-span-1 flex items-center justify-center product-quantity-container">{product.quantity}</span>
                <button
                  className="col-span-1 flex items-center justify-center quantity-changer"
                  onClick={() => changeQuantityProduct(id, "increase")}
                >
                  +
                </button>
              </div>
            </div>
          ))}
      </div>
      {selectedProducts && selectedProducts.length > 0 && (
        <>
          <h6 className="basket-title">Checkout</h6>
          <div className="cart-wrapper bg-white w-full p-2">
            <div className="w-full max-h-40 flex flex-col items-center justify-center">
              <div className="total-price-container mb-5">
                <label className="total-price-label text-center">
                  Total Price: <span className="total-price text-blue-600 font-bold">{totalPrice} &#8378;</span>
                </label>
              </div>
              <button
                onClick={() => navigate("/checkedout")}
                className="checkout-button w-40 flex justify-center items-center gap-2 px-4 h-8 bg-blue-600 rounded-md text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Basket;
