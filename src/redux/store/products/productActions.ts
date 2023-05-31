import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductList = createAsyncThunk('product/getProductList', async () => {
    try {
        const { data } = await axios.get(`http://localhost:4000/universe/getProducts`);
        console.log(data)
        return data;
    } catch (error: any) {
        return console.log(error.message);
    }
});