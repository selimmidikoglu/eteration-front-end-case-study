import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getBrandFilteredProducts, getModelFilteredProducts, getProductById, getProductList, getSortByProductList } from './productActions';
import { Product, ProductListPayload, ProductBrandFilteredPayload, ProductModelFilteredPayload, ProductSortByListPayload } from "../../../types/productTypes";

interface ProductReducerState {
    defaultProducts: Product[],
    brandFilteredProducts: Product[];
    modelFilteredProducts: Product[];
    mapModelToProduct: object,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    currentPage: number,
    totalPageNumber: number,
    searchTerm: string,
    modelFilteredTotalPageNumber: number,
    selectedBrand: string,
    selectedModel: string,
    selectedSortBy: string,
    defaultModels: string[],
    models: string[],
    brands: string[],
    selectedProduct: Product | null;
}

export const initialState: ProductReducerState = {
    defaultProducts: [],
    brandFilteredProducts: [],
    modelFilteredProducts: [],
    loading: 'idle',
    currentPage: 1,
    totalPageNumber: 0,
    searchTerm: "",
    selectedBrand: "",
    selectedModel: "",
    defaultModels: [],
    models: [],
    brands: [],
    mapModelToProduct: {},
    selectedProduct: null,
    selectedSortBy: ""
};


export const productSlice = createSlice({
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
                    // totalPageNumber: totalPageNumber,
                    defaultModels: models,
                    brands: brands,
                    currentPage: 1
                }
            })
            .addCase(getProductList.rejected, (state) => {
                return {
                    ...state,
                    loading: 'failed'
                }
            })
        builder
            .addCase(getSortByProductList.pending, (state) => {
                return {
                    ...state,
                    loading: 'pending'
                }
            })
            .addCase(getSortByProductList.fulfilled, (state, action) => {
                const { data }: ProductSortByListPayload = action.payload;
                return {
                    ...state,
                    defaultProducts: data,
                    loading: 'succeeded',
                    currentPage: 1
                }
            })
            .addCase(getSortByProductList.rejected, (state) => {
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
                    // brandFilteredProducts: data,
                    defaultProducts: data,
                    loading: 'succeeded',
                    brandFilteredTotalPageNumber: totalPageNumber,
                    models: models,
                    mapModelToProduct: mapModelToProduct,
                    currentPage: 1
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
                    currentPage: 1
                }
            })
            .addCase(getModelFilteredProducts.rejected, (state) => {
                return {
                    ...state,
                    loading: 'failed'
                }
            })
        builder.addCase(getProductById.pending, (state) => {
            return {
                ...state,
                loading: 'pending'
            }
        })
            .addCase(getProductById.fulfilled, (state, action) => {
                const { data }: any = action.payload;
                return {
                    ...state,
                    loading: 'succeeded',
                    selectedProduct: data
                }
            })
            .addCase(getProductById.rejected, (state) => {
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
                selectedBrand: action.payload,
                selectedModel: ""
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
                modelFilteredProducts: (mapModelToProduct as { [key: string]: Product[] })[action.payload]
            };
        },
        setSelectedSortBy(state, action: PayloadAction<string>) {

            if (action.payload === "") {
                return {
                    ...state,
                    selectedSortBy: ""
                }
            }
            return {
                ...state,
                selectedSortBy: action.payload
            };
        },
        setCurrentPageAndTotalNumberOfPages(state, action: PayloadAction<number>) {
            const totalPageNumber = action.payload
            return {
                ...state,
                totalPageNumber: totalPageNumber
            }
        },
        setSearchTerm(state, action: PayloadAction<string>) {
            return {
                ...state,
                searchTerm: action.payload
            };
        },

    },
});


export const { setPage, setSelectedBrand, setSelectedModel, setProductsOfModelWithSpecificBrand, setSelectedSortBy, setCurrentPageAndTotalNumberOfPages, setSearchTerm } = productSlice.actions;
export default productSlice.reducer;

