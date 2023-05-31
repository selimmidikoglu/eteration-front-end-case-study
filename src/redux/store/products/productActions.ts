import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductList = createAsyncThunk('product/getProductList', async () => {
    try {
        const { data } = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/products`);
        console.log(data)
        return data;
    } catch (error: any) {
        return console.log(error.message);
    }
});