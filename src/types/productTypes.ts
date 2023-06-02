export interface Product {
    brand: string,
    createdAt: string,
    description: string,
    id: string,
    image: string,
    model: string,
    name: string,
    price: string,
}

export interface ProductListPayload {
    data: any | void;
    totalPageNumber: number,
    models: string[],
    brands: string[]

}
export interface ProductBrandFilteredPayload {
    data: any | void;
    totalPageNumber: number,
    models: string[],
    mapModelToProduct: object | null
}
export interface ProductModelFilteredPayload {
    data: any | void;
    totalPageNumber: number,
}
export interface ProductSortByListPayload {
    data: any | void;
    totalPageNumber: number,
}