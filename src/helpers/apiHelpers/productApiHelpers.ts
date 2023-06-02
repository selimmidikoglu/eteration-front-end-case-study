import axios from "axios";


export const setURLandParams = async (param?: { [key: string]: string } | null | string) => {
    const url = new URL("https://5fc9346b2af77700165ae514.mockapi.io/products");

    if (param) {
        if (!param.id) {
            Object.entries(param ?? {}).map(([key, value]) => {
                url.searchParams.set(key, value);
            })
        } else {
            url.pathname = url.pathname + "/" + param.id;
        }
    }

    const { data } = await axios.get(url.toString());
    return data;
};