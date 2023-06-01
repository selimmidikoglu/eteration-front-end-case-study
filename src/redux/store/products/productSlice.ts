import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBrandFilteredProducts, getModelFilteredProducts, getProductList } from './productActions';
import { Product, ProductListPayload, ProductBrandFilteredPayload, ProductModelFilteredPayload } from "../../../types/productTypes";

interface ProductReducerState {
    defaultProducts: Product[],
    brandFilteredProducts: Product[];
    modelFilteredProducts: Product[];
    mapModelToProduct: object,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    currentPage: number,
    totalPageNumber: number,
    brandFilteredTotalPageNumber: number,
    modelFilteredTotalPageNumber: number,
    selectedBrand: string,
    selectedModel: string,
    defaultModels: string[],
    models: string[],
    brands: string[],
}

const initialState: ProductReducerState = {
    defaultProducts: [],
    brandFilteredProducts: [],
    modelFilteredProducts: [],
    loading: 'idle',
    currentPage: 1,
    totalPageNumber: 0,
    brandFilteredTotalPageNumber: 1,
    modelFilteredTotalPageNumber: 1,
    selectedBrand: "",
    selectedModel: "",
    defaultModels: [],
    models: [],
    brands: [],
    mapModelToProduct: {},
};


const productSlice = createSlice({
    name: "product",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.pending, (state) => {
                return {
                    ...state,
                    loading: 'pending'
                }
            })
            .addCase(getProductList.fulfilled, (state, action) => {
                const { data, totalPageNumber, models, brands }: ProductListPayload = action.payload;
                return {
                    ...state,
                    defaultProducts: data,
                    loading: 'succeeded',
                    totalPageNumber: totalPageNumber,
                    defaultModels: models,
                    brands: brands
                }
            })
            .addCase(getProductList.rejected, (state) => {
                return {
                    ...state,
                    loading: 'failed'
                }
            })
        // Brand Filtered Products
        builder.addCase(getBrandFilteredProducts.pending, (state) => {
            return {
                ...state,
                loading: 'pending'
            }
        })
            .addCase(getBrandFilteredProducts.fulfilled, (state, action) => {
                const { data, totalPageNumber, models, mapModelToProduct }: ProductBrandFilteredPayload = action.payload;
                return {
                    ...state,
                    brandFilteredProducts: data,
                    loading: 'succeeded',
                    brandFilteredTotalPageNumber: totalPageNumber,
                    models: models,
                    mapModelToProduct: mapModelToProduct
                }
            })
            .addCase(getBrandFilteredProducts.rejected, (state) => {
                return {
                    ...state,
                    loading: 'failed'
                }
            })
        // Model Filtered Products
        builder.addCase(getModelFilteredProducts.pending, (state) => {
            return {
                ...state,
                loading: 'pending'
            }
        })
            .addCase(getModelFilteredProducts.fulfilled, (state, action) => {
                const { data, totalPageNumber }: ProductModelFilteredPayload = action.payload;
                return {
                    ...state,
                    modelFilteredProducts: data,
                    loading: 'succeeded',
                    modelFilteredTotalPageNumber: totalPageNumber,
                }
            })
            .addCase(getModelFilteredProducts.rejected, (state) => {
                return {
                    ...state,
                    loading: 'failed'
                }
            })
    },
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            return {
                ...state,
                currentPage: action.payload
            };
        },
        setSelectedBrand(state, action: PayloadAction<string>) {
            if (action.payload === "") {
                return {
                    ...state,
                    selectedBrand: "",
                    brandFilteredProducts: [],
                    brandFilteredTotalPageNumber: 0,
                    models: []
                }
            }
            return {
                ...state,
                selectedBrand: action.payload
            };
        },
        setSelectedModel(state, action: PayloadAction<string>) {
            if (action.payload === "") {
                return {
                    ...state,
                    selectedModel: "",
                    modelFilteredProducts: [],
                    modelFilteredTotalPageNumber: 0
                }
            }
            return {
                ...state,
                selectedModel: action.payload
            };
        },
        setProductsOfModelWithSpecificBrand(state, action: PayloadAction<string>) {
            const { mapModelToProduct } = state;
            if (action.payload === "") {
                return {
                    ...state,
                    selectedModel: "",
                    modelFilteredProducts: [],
                    modelFilteredTotalPageNumber: 0
                }
            }
            return {
                ...state,
                selectedModel: action.payload,
                modelFilteredProducts: mapModelToProduct[action.payload]
            };
        },

    },
});


export const { setPage, setSelectedBrand, setSelectedModel, setProductsOfModelWithSpecificBrand } = productSlice.actions;
export default productSlice.reducer;

