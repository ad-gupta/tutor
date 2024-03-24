import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    orderItems: {},
    loading: false,
    error: null,
    message: "",
    success: false
}

const slice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addToCartReq : (state) => {
            state.loading = true;
        },
        addToCartSuccess: (state, payload) => {
            state.orderItems = payload.message
            state.success = payload.success
            state.loading = false
        },
        addToCartFail: (state, payload) => {
            state.loading = false;
            state.error = payload
            state.success = false
        },
        cartReq: (state) => {
            state.loading = true;
        },
        cartSuccess: (state, payload) => {
            state.loading = false;
            state.orderItems = payload.message
        },
        cartFail: (state, payload) => {
            state.loading = false;
            state.orderItems = payload
        },
        clearErrors: (state) => {
            state.error = null;
        }
    }
})

export const {addToCartFail, addToCartReq, addToCartSuccess, cartFail, cartReq, cartSuccess, clearErrors} = slice.actions;

export default slice.reducer