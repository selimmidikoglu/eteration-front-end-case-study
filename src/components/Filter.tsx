import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import "../styles/filters.css";
import {
  getBrandFilteredProducts,
  getModelFilteredProducts,
  getProductList,
  getSortByProductList,
} from "../redux/store/products/productActions";
import {
  setProductsOfModelWithSpecificBrand,
  setSelectedBrand,
  setSelectedModel,
  setSelectedSortBy,
} from "../redux/store/products/productSlice";
import React from "react";

type Props = {};
const styleOfFiltersDiv = `h-fit bg-white flex flex-col justify-center items-center col-span-1 lg:col-span-3 p-5 sm:m-5 m-1`;
const sortBy = {
  "Old to new": { order: "asc", sortBy: "createdAt" },
  "New to old": { order: "desc", sortBy: "createdAt" },
  "Price high to low": { order: "desc", sortBy: "price" },
  "Price low to high": { order: "asc", sortBy: "price" },
};

const Filter = ({}: Props) => {
  const {
    brands,
    selectedBrand,
    models,
    defaultModels,
    selectedModel,
    selectedSortBy,
  } = useSelector((state: RootState) => state.productSlice);
  const dispatch = useAppDispatch();

  const toggleBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    let brand = event.target.value;
    if (brand === selectedBrand) {
      dispatch(setSelectedBrand(""));
      brand = "";
    } else {
      dispatch(setSelectedBrand(brand));
    }
    if (selectedSortBy !== "") {
      dispatch(
        getBrandFilteredProducts({
          brand: brand,
          ...sortBy[selectedSortBy as keyof typeof sortBy],
        })
      );
    } else if (brand == "") {
      dispatch(getBrandFilteredProducts(null));
    } else {
      dispatch(getBrandFilteredProducts({ brand: brand }));
    }
  };
  const toggleSelectedSortyBy = (value: string) => {
    dispatch(setSelectedSortBy(value));
  };
  const toggleSort = (
    event: React.ChangeEvent<HTMLInputElement>,
    sortByObject: { [key: string]: string },
    sortBy: string
  ) => {
    const sortByChecked = event.target.value;

    if (sortByChecked === selectedSortBy) {
      toggleSelectedSortyBy("");
      sortByObject = {};
    } else {
      toggleSelectedSortyBy(sortBy);
    }
    let params: any;
    if (selectedBrand !== " ") {
      params = { ...sortByObject, brand: selectedBrand };
    }
    if (selectedBrand == "") {
      params = sortByObject;
    }

    dispatch(getSortByProductList(params));
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
    return currentModels.map((model: string, index: number) => (
      <div
        key={`models-${index}`}
        className="flex flex-row align-middle justify-start h-6 mt-2"
      >
        <input
          checked={model === selectedModel}
          id={`radio-${model}`}
          type="radio"
          value={model}
          name="model-radio"
          className="brand-radio-button w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
          onClick={toggleModel}
        />
        <label htmlFor={`radio-${model}`} className="brand-label ml-2">
          {model}
        </label>
      </div>
    ));
  };
  return (
    <>
      {/* <h6 className="text-light text-sm mb-5 md:col-span-1 col-span-1">Sort By</h6> */}
      <div className={styleOfFiltersDiv}>
        <div className="brand-picker-wrapper">
          {Object.keys(sortBy).map((el) => (
            <div className="flex flex-row align-middle justify-start h-6 mt-2">
              <input
                checked={el === selectedSortBy} // Set checked based on the selected brand
                id={`radio-${el}`}
                type="radio"
                value={el}
                name="sort-by-date-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
                onClick={(e) =>
                  toggleSort(e, sortBy[el as keyof typeof sortBy], el)
                }
              />
              <label htmlFor={`radio-${el}`} className="brand-label ml-2">
                {el}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* <h6 className="text-light text-sm mb-5">Brands</h6> */}
      <div className={styleOfFiltersDiv}>
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
                className="brand-radio-button w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
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
          {/* <h6 className="text-light text-sm mb-5">Models</h6> */}
          <div className={styleOfFiltersDiv}>
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
    </>
  );
};

export default Filter;
