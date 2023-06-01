import { Product } from "../../types/productTypes";

export const retrieveFilters = (products: Product[]) => {
    const models: string[] = [];
    const brands: string[] = [];
    /* 
        The implementation will only retrieve models and brands as string array.
        The api calls will be used to get the related products.
        The other approach would be if we are certaion about the number of default products we retrieve,
        than we can create a model or brands object and can create model=> product_id[] objects but this
        is not a good practice. But can be eligible for small number of products coming from api.
    */
    products.map(product => {
        if (!models.includes(product.model)) {
            models.push(product.model)
        }
        if (!brands.includes(product.brand)) {
            brands.push(product.brand)
        }
    });
    models.sort();
    brands.sort();
    return { models, brands };
}

export const retrieveModels = (products: Product[]) => {
    const models: string[] = [];
    products.map(product => {
        if (!models.includes(product.model)) {
            models.push(product.model)
        }
    });
    models.sort()
    return models;
}

export const createModelProductMap = (products: Product[]) => {
    const mapModeltoProduct: { [model: string]: Product[] } = {};
    products.forEach((product) => {
        if (!(product.model in mapModeltoProduct)) {
            mapModeltoProduct[product.model] = [];
        }
        mapModeltoProduct[product.model].push(product);
    });
    return mapModeltoProduct;
};