import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import "../styles/filters.css";
import { getBrandFilteredProducts, getModelFilteredProducts, getSortByProductList } from "../redux/store/products/productActions";
import { setProductsOfModelWithSpecificBrand, setSelectedBrand, setSelectedModel, setSelectedSortBy } from "../redux/store/products/productSlice";
import React from "react";
import { sortBy } from "../helpers/product/productFilterCreationHelpers";
import { setUrlQueryStrings } from "../helpers/apiHelpers/productApiHelpers";

type Props = {};
const styleOfFiltersDiv = `sm:w-56 w-full h-fit col-span-1 lg:col-span-3 sm:mb-5 m-1`;

const Filter = ({}: Props) => {
  const { brands, selectedBrand, models, defaultModels, selectedModel, selectedSortBy, searchTerm } = useSelector(
    (state: RootState) => state.productSlice
  );
  const dispatch = useAppDispatch();

  const toggleSort = (event: React.ChangeEvent<HTMLInputElement>, sortByValue: string) => {
    const sortByChecked = event.target.value;
    let sortByStr = "";
    if (sortByChecked === selectedSortBy) {
      dispatch(setSelectedSortBy(""));
    } else {
      dispatch(setSelectedSortBy(sortByValue));
      sortByStr = sortByValue;
    }
    const param = {
      selectedBrand: selectedBrand,
      selectedSortBy: sortByStr,
      searchTerm: searchTerm,
    };
    console.log(param);
    const { params, condition } = setUrlQueryStrings(param);

    dispatch(getSortByProductList(params));
  };
  const toggleBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
    let brand = event.target.value;
    if (brand === selectedBrand) {
      dispatch(setSelectedBrand(""));
      brand = "";
    } else {
      dispatch(setSelectedBrand(brand));
    }
    const param = {
      selectedBrand: brand,
      selectedSortBy: selectedSortBy,
      searchTerm: searchTerm,
    };
    const { params, condition } = setUrlQueryStrings(param);
    dispatch(getBrandFilteredProducts(params));
  };

  const toggleModel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const model = event.target.value;

    const toggleSelectedModel = (value: string) => dispatch(setSelectedModel(value));

    if (model === selectedModel) {
      toggleSelectedModel("");
      return;
    }

    if (selectedBrand) {
      toggleSelectedModel(model);
      dispatch(setProductsOfModelWithSpecificBrand(model));
    } else {
      toggleSelectedModel(model);
      dispatch(getModelFilteredProducts({ brand: selectedBrand, model: model }));
    }
  };

  const renderDefaultModelsOrBrandModels = () => {
    const currentModels = models.length > 0 ? models : defaultModels;
    return currentModels.map((model: string, index: number) => (
      <div key={`models-${index}`} className="flex flex-row align-middle justify-start h-6 mt-2">
        <input
          checked={model === selectedModel}
          id={`radio-${model}`}
          type="radio"
          value={model}
          name="model-radio"
          className="brand-radio-button w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
          onClick={toggleModel}
        />
        <label htmlFor={`radio-${model}`} className="brand-label md:text-sm sm:text-xs text-xs ml-2">
          {model}
        </label>
      </div>
    ));
  };
  return (
    <>
      <div className={styleOfFiltersDiv}>
        <h6 className="w-full text-light text-sm text-left ">Sort By</h6>
        <div className="sortby-picker-wrapper bg-white h-60">
          {Object.keys(sortBy).map((el) => (
            <div key={`sortBy-${el}`} className="flex flex-row align-middle justify-start h-6 mt-2">
              <input
                checked={el === selectedSortBy}
                id={`radio-${el}`}
                type="radio"
                value={el}
                name="sort-by-date-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
                onClick={(e) => toggleSort(e, el)}
              />
              <label htmlFor={`radio-${el}`} className="brand-label md:text-sm sm:text-xs text-xs ml-2">
                {el}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className={styleOfFiltersDiv}>
        <h6 className="w-full text-light text-sm text-left">Brands</h6>
        <div className="brand-picker-wrapper bg-white h-60">
          <input type="text" placeholder="Search" className="w-full rounded-sm text-sm text-white h-8 pl-2 bg-gray-200" />
          <div className="filter-box-inner">
            {brands.map((brand) => (
              <div key={`brand-${brand}`} className="flex flex-row align-middle justify-start h-6 mt-2">
                <input
                  checked={brand === selectedBrand}
                  id={`radio-${brand}`}
                  type="radio"
                  value={brand}
                  name="brand-radio"
                  className="brand-radio-button w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
                  onClick={toggleBrand}
                />
                <label htmlFor={`radio-${brand}`} className="brand-label md:text-sm sm:text-xs text-xs ml-2">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {defaultModels.length > 0 && (
        <>
          <div className={styleOfFiltersDiv}>
            <h6 className="w-full text-light text-sm text-left">Models</h6>
            <div className="brand-picker-wrapper bg-white h-60">
              <input type="text" placeholder="Search" className="w-full rounded-sm text-sm text-white h-8 pl-2 bg-gray-200" />
              <div className="filter-box-inner">{renderDefaultModelsOrBrandModels()}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Filter;
