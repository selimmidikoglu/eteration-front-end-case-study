import { Product } from "../types/productTypes";
import "../styles/productCard.css";
type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  console.log(product);
  return (
    <div className="product-card-wrapper flex align-center justify-center flex-col p-5 bg-white m-2">
      <img src={product.image} className="mx-4 my-3"></img>
      <p className="mx-4 text-blue-600 font-500 text-sm">
        {product.price} &#8378;
      </p>
      <p className="mx-4 text-black font-400 text-sm ">{product.name}</p>
      <button className="bg-blue-600 w-full h-9 text-white rounded">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
