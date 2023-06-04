import { Product } from "../types/productTypes";
import "../styles/productCard.css";
import { useAppDispatch } from "../redux/store";
import { addToBasket } from "../redux/store/basket/basketSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addProductToBasket = (product: Product) => {
    dispatch(addToBasket(product));
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    addProductToBasket(product);
  };

  const navigateProductDetail = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      data-testid="product-card"
      className="md:h-80 h-96 col-span-1 pb-4 flex flex-col align-center justify-between bg-white mx-2 my-10 overflow-y-auto overflow-x-hidden "
      onClick={navigateProductDetail}
    >
      <div className="w-full h-fit">
        <img src={product.image} className="w-full aspect-w-1 p-2"></img>
      </div>
      <p className="mx-4 text-blue-600 font-500 text-sm">{product.price} &#8378;</p>
      <p className="mx-4 text-black font-400 sm:text-sm text-xs h-10">{product.name}</p>
      <button className="bg-blue-600  h-9 text-white text-sm rounded mx-4" onClick={handleButtonClick}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
