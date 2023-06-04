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

  const toggleSort = (checked: boolean, sortByValue: string) => {
    let sortByStr = "";
    if (checked) {
      dispatch(setSelectedSortBy(sortByValue));
      sortByStr = sortByValue;
    } else {
      dispatch(setSelectedSortBy(""));
    }
    const param = {
      selectedBrand: selectedBrand,
      selectedSortBy: sortByStr,
      searchTerm: searchTerm,
    };

    const { params } = setUrlQueryStrings(param);

    dispatch(getSortByProductList(params));
  };
  const toggleBrand = (brand: string, checked: boolean) => {
    let newBrand = "";
    if (checked) {
      newBrand = brand;
      dispatch(setSelectedBrand(brand));
    } else {
      dispatch(setSelectedModel(""));
      dispatch(setSelectedBrand(""));
    }
    const param = {
      selectedBrand: newBrand,
      selectedSortBy: selectedSortBy,
      searchTerm: searchTerm,
    };

    const { params } = setUrlQueryStrings(param);
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
          type="checkbox"
          value={model}
          data-testid={`model-checkbox-${index}`}
          name="model-radio"
          className="brand-radio-button w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
          onChange={toggleModel}
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
          {Object.keys(sortBy).map((el, index) => (
            <div key={`sortBy-${el}`} className="flex flex-row align-middle justify-start h-6 mt-2">
              <input
                checked={el === selectedSortBy}
                id={`radio-${el}`}
                type="checkbox"
                value={el}
                data-testid={`sortby-checkbox-${index}`}
                name="sort-by-date-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
                onChange={(e) => toggleSort(e.target.checked, el)}
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
            {brands.map((brand, index) => (
              <div key={`brand-${brand}`} className="flex flex-row align-middle justify-start h-6 mt-2">
                <input
                  checked={brand === selectedBrand}
                  id={`radio-${brand}`}
                  type="checkbox"
                  value={brand}
                  data-testid={`brand-checkbox-${index}`}
                  name="brand-radio"
                  className="brand-radio-button w-4 h-4 text-blue-600 bg-gray-100 border-blue-300 dark:bg-blue-700"
                  onChange={(e) => toggleBrand(brand, e.target.checked)}
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
