import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getTotalPageCount } from "../../../helpers/product/productPageNumberCreationHelpers";
import { retrieveFilters, retrieveModels, createModelProductMap } from "../../../helpers/product/productFilterCreationHelpers";
import { setURLandParams } from "../../../helpers/apiHelpers/productApiHelpers";


export const getProductList = createAsyncThunk('product/getProductList', async (param?: { [key: string]: string } | null) => {
    try {
        const data = await setURLandParams(param);
        const totalPageNumber = getTotalPageCount(data.length);
        const { models, brands } = retrieveFilters(data);
        return { data, totalPageNumber, models, brands };
    } catch (error: any) {
        return { data: null, totalPageNumber: 0, models: [], brands: [] }
    }
});
export const getProductById = createAsyncThunk('product/getProductById', async (param?: { [key: string]: string } | null) => {
    try {
        const data = await setURLandParams(param);
        return { data };
    } catch (error: any) {
        return { data: null }
    }
});

export const getBrandFilteredProducts = createAsyncThunk('product/getBrandFilteredProducts', async (brand: string) => {

    try {
        const { data } = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products`, {
            params: {
                brand: brand
            }
        });
        const totalPageNumber = getTotalPageCount(data.length);
        const models = retrieveModels(data);
        const mapModelToProduct = createModelProductMap(data);
        return { data, totalPageNumber, models, mapModelToProduct };
    } catch (error: any) {
        return { data: null, totalPageNumber: 0, models: [], mapModelToProduct: {} }
    }
});

/* @WARNING Below code normally adds brand than model as query params but since the API returns wrong values 
    implementation of product search which is filtered with both brand and model is going to be handled in front end because when API is called with a URL like this
    https://5fc9346b2af77700165ae514.mockapi.io/products?brand=Bentley&model=XC90
    Brand = Bentley
    Model = XC90
    Response:
    [
        {
            createdAt: "2022-03-30T09:49:18.887Z",
            name: "Volvo Impala",
            image: "http://placeimg.com/640/480/animals",
            price: "998.00",
            model: "Model 3",
            brand: "Bentley",
            id: "44"
        },
        {
            createdAt: "2022-03-30T10:34:12.923Z",
            name: "Chrysler V90",
            image: "http://placeimg.com/640/480/cats",
            price: "150.00",
            model: "Model 3",
            brand: "Bentley",
            id: "52"
        },
        {
            createdAt: "2022-03-30T07:40:08.143Z",
            name: "Nissan V90",
            image: "http://placeimg.com/640/480/technics",
            price: "759.00",
            model: "Jetta",
            brand: "Bentley",
            id: "54"
        },
        {
            createdAt: "2022-03-30T01:51:34.534Z",
            name: "Hyundai Element",
            image: "http://placeimg.com/640/480/cats",
            price: "988.00",
            model: "Jetta",
            brand: "Bentley",
            id: "56"
        },
        {
            createdAt: "2022-03-30T00:36:36.504Z",
            name: "Dodge LeBaron",
            image: "http://placeimg.com/640/480/technics",
            price: "915.00",
            model: "XC90",
            brand: "Bentley",
            id: "69"
        }
    ]

    !!!! As we can see API does not work properly it brings all the Brands which have model of XC90 which means it does not take brand into consideration while searching.

    !!! One other solution would be getting model products with ids which is more beneificial solution since any variable of the products would
    have been changed by product owner. But sending a lot of request for a lot of products does not look good. Still can be implemented in this way.
    But I have choosen the way to create a mapping between model => product[] so, I can render specific brand && specific model products accordingly.
*/

export const getModelFilteredProducts = createAsyncThunk('product/getModelFilteredProducts', async ({ brand, model }: { brand: string, model: string }) => {
    console.log("Brand", brand)
    try {
        const response = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products`, {
            params: brand !== "" ? {
                brand: brand,
                model: model
            } : {
                model: model
            }
        });
        const { data } = response;
        const fullUrl = response.request.responseURL;
        console.log(data)
        const totalPageNumber = getTotalPageCount(data.length);
        data.sort()
        console.log(fullUrl)
        return { data, totalPageNumber };
    } catch (error: any) {
        return { data: null, totalPageNumber: 0 }
    }
});


