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
export const getSortByProductList = createAsyncThunk('product/getSortByProductList', async (param?: { [key: string]: string } | null) => {
    try {
        const data = await setURLandParams(param);
        return { data };
    } catch (error: any) {
        return { data: null }
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

export const getBrandFilteredProducts = createAsyncThunk('product/getBrandFilteredProducts', async (param?: { [key: string]: string } | null) => {

    try {
        const data = await setURLandParams(param);
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

    !!!! As we can see API does not work properly it brings all the Models Belongs to Bentley we can pull the related brand&model from the response
    but not a best practice.

    !!! One other solution would be getting model products with ids which is more beneificial solution since any variable of the products would
    have been changed by product owner. But sending a lot of request for a lot of products does not look good. Still can be implemented in this way.
    But I have choosen the way to create a mapping between model => product[] so, I can render specific brand && specific model products accordingly.
    Also it does not work for name & brand & model but ı made my requests in this way.
    https://5fc9346b2af77700165ae514.mockapi.io/products?brand=Bentley&name=da&order=asc&sortBy=price
    [
        {
            createdAt: "2022-03-30T10:34:12.923Z",
            name: "Chrysler V90",
            image: "http://placeimg.com/640/480/cats",
            price: "150.00",
            description: "Eos facere et cumque eos explicabo facilis minus repudiandae. Temporibus sed vitae perspiciatis amet. Minima repudiandae voluptatem error provident unde dolores aut. Sequi voluptatem voluptate molestiae nam nihil. Ut eos deserunt cupiditate quo ipsa nihil dolores culpa.\n \rVoluptatem ratione quo adipisci provident odio omnis dolorem porro. Et possimus sed soluta deleniti vel. Eos vel accusamus. Aut aut dolore voluptatibus non aperiam aut alias. Quaerat quia facilis eum ipsam minus. Cupiditate itaque voluptates ea.\n \rCorporis ut quibusdam. Et sit accusamus explicabo cumque voluptas quam voluptatem vitae labore. Laboriosam quia quo assumenda possimus vero doloremque deserunt nam qui.,
            model: "Model 3",
            brand: "Bentley",
            id: "52"
        },
        {
            createdAt: "2022-03-30T07:40:08.143Z",
            name: "Nissan V90",
            image: "http://placeimg.com/640/480/technics",
            price: "759.00",
            description: "Dignissimos illum repellendus. Dicta in dignissimos voluptas magnam consequatur rerum ut dolore sint. Ipsam ut quia dignissimos hic ut cumque natus libero. Qui autem et fugiat aut non rerum voluptatem impedit modi. Et atque quis odio qui expedita cupiditate id.\n \rSapiente ut dolor excepturi. Cum ut nihil qui dolores quasi modi non laborum rerum. Voluptatem qui architecto dicta temporibus qui et ut a dolor.\n \rEligendi dolores eum et. Iste harum excepturi ut incidunt consequatur vel officiis impedit. Nisi beatae dignissimos facere. Libero ea quo quisquam qui voluptas voluptatem. Perferendis commodi nesciunt at et voluptates ut. Minima ut sed tempore.,
            model: "Jetta",
            brand: "Bentley",
            id: "54"
        },
        {
            createdAt: "2022-03-30T00:36:36.504Z",
            name: "Dodge LeBaron",
            image: "http://placeimg.com/640/480/technics",
            price: "915.00",
            description: "Quasi voluptates sit qui dolores odio. Adipisci veritatis nihil in ab magnam voluptate. Doloribus perspiciatis ut tempora possimus dolorum officiis. Cupiditate itaque voluptatem adipisci odit cumque quod. Est ad praesentium nulla.\n \rCommodi id aut voluptate reiciendis aut veniam consequatur. Qui voluptatem reprehenderit corrupti autem maxime non inventore explicabo voluptate. Sed commodi blanditiis non delectus inventore non.\n \rFuga recusandae rerum nihil iusto veniam. Hic qui nihil. Ipsum temporibus distinctio dolor porro. Ratione quis dolorem.,
            model: "XC90",
            brand: "Bentley",
            id: "69"
        },
        {
            createdAt: "2022-03-30T01:51:34.534Z",
            name: "Hyundai Element",
            image: "http://placeimg.com/640/480/cats",
            price: "988.00",
            description: "Adipisci debitis sed officia et omnis qui ut eos. Dicta dolorem quae aut. Libero dicta cumque eos non cupiditate doloribus qui. Voluptas rerum quod enim et aperiam est quia. Molestiae minus ut possimus quae.\n \rAlias illo vel doloribus ut. Quis accusantium nisi aut voluptas excepturi qui officia molestias blanditiis. Enim ut aliquam velit corporis voluptas ullam. Sapiente omnis possimus accusantium repudiandae quis dolorem sapiente et atque. Debitis culpa aliquam quasi delectus sed dolores dolores.\n \rRecusandae qui minima. Eius voluptatum esse ut rerum odio porro adipisci veniam velit. Iste perspiciatis perferendis voluptatem quisquam. Voluptatem qui nihil cum veritatis vel laudantium. Voluptate ut fuga dolores id soluta delectus quasi et officia.,
            model: "Jetta",
            brand: "Bentley",
            id: "56"
        },
        {
            createdAt: "2022-03-30T09:49:18.887Z",
            name: "Volvo Impala",
            image: "http://placeimg.com/640/480/animals",
            price: "998.00",
            description: "Dignissimos ipsum suscipit ut et. Ut minus voluptas qui fugiat corrupti est debitis. Similique alias impedit repellendus placeat consequatur non rerum commodi quia. Rerum eum consequatur soluta atque et provident.\n \rAut sequi reiciendis. Et laborum molestiae ut quia non. Aspernatur corrupti et.\n \rQuas assumenda assumenda voluptas ut. Error molestias vero consectetur quos sit quod sit reprehenderit. Doloribus tenetur molestias aut natus doloribus doloremque dolor ipsa enim.,
            model: "Model 3",
            brand: "Bentley",
            id: "44"
        }
    ]
    misses name
*/



export const getModelFilteredProducts = createAsyncThunk('product/getModelFilteredProducts', async ({ brand, model }: { brand: string, model: string }) => {
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
        const totalPageNumber = getTotalPageCount(data.length);
        data.sort()
        return { data, totalPageNumber };
    } catch (error: any) {
        return { data: null, totalPageNumber: 0 }
    }
});


