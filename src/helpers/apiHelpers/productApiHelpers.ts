import axios from "axios";


export const setURLandParams = async (param?: { [key: string]: string } | null | string) => {
    const url = new URL("https://5fc9346b2af77700165ae514.mockapi.io/products");

    if (param) {
        if (!param.id) {
            url.searchParams.set(Object.keys(param)[0], Object.values(param)[0]);
            console.log(url.toString());
        } else {
            url.pathname = url.pathname + "/" + param.id;
            console.log(url.toString());
        }
    }

    const { data } = await axios.get(url.toString());
    console.log(data);
    return data;
};