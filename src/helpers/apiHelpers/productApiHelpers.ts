import axios from "axios";
import { sortBy } from "../product/productFilterCreationHelpers";


export const setURLandParams = async (param?: { [key: string]: string } | null | string) => {
    const url = new URL("https://5fc9346b2af77700165ae514.mockapi.io/products");
    console.log(param)
    if (param) {
        if (!param.id) {
            Object.entries(param ?? {}).map(([key, value]) => {
                url.searchParams.set(key, value);
            })
        } else {
            url.pathname = url.pathname + "/" + param.id;
        }
    }
    console.log(url.toString());
    const { data } = await axios.get(url.toString());
    return data;
};

export const setUrlQueryStrings = (queryObject: any) => {
    const { selectedBrand, selectedSortBy, searchTerm } = queryObject;
    let params: any = {};
    let condition = {
        selectedBrand: false,
        selectedSortBy: false,
        searchTerm: false
    }
    if (selectedSortBy !== "") {
        params = { ...params, ...sortBy[selectedSortBy] };
        condition.selectedSortBy = true;
    }
    if (searchTerm !== "") {
        params = { name: searchTerm, ...params };
        condition.searchTerm = true;
    }
    if (selectedBrand !== "") {
        params = { brand: selectedBrand, ...params };
        condition.selectedBrand = true;
    }

    return { params, condition };
}