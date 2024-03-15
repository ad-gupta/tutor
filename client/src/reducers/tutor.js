import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tutorials: {},
    loading: false,
    success: false,
    message: "",
    error: null,
    resultperpage: 4,
    courseCount: 4,
    filteredTutorialsCount: 2
}

const tutorials = createSlice({
    name: 'tutorials',
    initialState,
    reducers: {
        tutorialRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        tutorialSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.tutorials = action.payload.tutorials;
            state.resultperpage = action.payload.resultperpage;
            state.courseCount = action.payload.courseCount;
            state.filteredTutorialsCount = action.payload.filteredTutorialsCount;
            state.success = true;
        },
        tutorialFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = true;
        },
    }
})


export const {tutorialRequest, tutorialSuccess, tutorialFail} = tutorials.actions

export default tutorials.reducer