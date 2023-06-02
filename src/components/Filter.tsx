import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import "../styles/filters.css";
import {
  getBrandFilteredProducts,
  getModelFilteredProducts,
} from "../redux/store/products/productActions";
import {
  setProductsOfModelWithSpecificBrand,
  setSelectedBrand,
  setSelectedModel,
} from "../redux/store/products/productSlice";

type Props = {};

const Filter = ({}: Props) => {
  const { brands, selectedBrand, models, defaultModels, selectedModel } =
    useSelector((state: RootState) => state.productSlice);
  const dispatch = useAppDispatch();

  const toggleBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brand = event.target.value;
    if (brand === selectedBrand) {
      dispatch(setSelectedBrand(""));
    } else {
      dispatch(setSelectedBrand(brand));
      dispatch(getBrandFilteredProducts(brand));
    }
  };

  const toggleModel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const model = event.target.value;

    const toggleSelectedModel = (value: string) =>
      dispatch(setSelectedModel(value));

    if (model === selectedModel) {
      toggleSelectedModel("");
      return;
    }

    if (selectedBrand) {
      toggleSelectedModel(model);
      dispatch(setProductsOfModelWithSpecificBrand(model));
    } else {
      toggleSelectedModel(model);
      dispatch(
        getModelFilteredProducts({ brand: selectedBrand, model: model })
      );
    }
  };

  const renderDefaultModelsOrBrandModels = () => {
    const currentModels = models.length > 0 ? models : defaultModels;
    return currentModels.map((model: string) => (
      <div className="flex flex-row align-middle justify-start h-6 mt-2">
        <input
          checked={model === selectedModel}
          id={`radio-${model}`}
          type="radio"
          value={model}
          name="model-radio"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 focus:ring-blue-500 focus:ring-2 dark:bg-blue-700"
          onClick={toggleModel}
        />
        <label htmlFor={`radio-${model}`} className="brand-label ml-2">
          {model}
        </label>
      </div>
    ));
  };
  return (
    <section className="col-span-1 flex flex-col justify-start items-end px-6">
      <h6 className="text-light text-sm mb-5">Brands</h6>
      <div className="w-48 h-fit bg-white flex flex-col align-middle justify-center p-5">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-sm text-sm text-white h-8 pl-2 bg-gray-200"
        />
        <div className="brand-picker-wrapper">
          {brands.map((brand) => (
            <div className="flex flex-row align-middle justify-start h-6 mt-2">
              <input
                checked={brand === selectedBrand} // Set checked based on the selected brand
                id={`radio-${brand}`}
                type="radio"
                value={brand}
                name="brand-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 focus:ring-blue-500  focus:ring-2 dark:bg-blue-700"
                onClick={toggleBrand}
              />
              <label htmlFor={`radio-${brand}`} className="brand-label ml-2">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
      {defaultModels.length > 0 && (
        <>
          <h6 className="text-light text-sm mb-5">Models</h6>
          <div className="w-48 h-fit bg-white flex flex-col align-middle justify-center p-5">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-sm text-sm text-white h-8 pl-2 bg-gray-200"
            />
            <div className="brand-picker-wrapper">
              {renderDefaultModelsOrBrandModels()}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Filter;
