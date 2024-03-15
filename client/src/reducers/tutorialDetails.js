import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    tutorialDetails: {},
}

const detailReducer = createSlice({
    name: 'tutorialDetails',
    initialState,
    reducers: {
        tutorialDetailsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        tutorialDetailsSuccess: (state, action) => {
            state.loading = false;
            state.tutorialDetails = action.payload;
        },
        tutorialDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        reviewDeleteRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        reviewDeleteSuccess: (state) => {
            state.loading = false;
        },

        reviewDeleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        reviewAddRequest: (state) => {
            state.loading = true;
            state.error = null;
        },

        reviewAddSuccess: (state) => {
            state.loading = false;
        },

        reviewAddFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
});

export const { tutorialDetailsRequest, tutorialDetailsSuccess, tutorialDetailsFail, reviewDeleteRequest, reviewDeleteSuccess, reviewDeleteFail, reviewAddFail, reviewAddRequest, reviewAddSuccess } = detailReducer.actions;
export default detailReducer.reducer;
