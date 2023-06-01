export const getTotalPageCount = (productsLength: number): number => {
    return Math.floor(productsLength / 12) + (productsLength % 12 > 0 ? 1 : 0);
}