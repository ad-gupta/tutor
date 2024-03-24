import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    course : {},
    loading: false,
    error: null,
    message: "",
    success: false
}

const reducer = createSlice({
    name: 'myCourses',
    initialState,
    reducers: {
        myCourseRequest: (state) => {
            state.loading = true;
        },
        myCourseSuccess: (state, action) => {
            state.loading = false;
            state.course = action.payload.message,
            state.success = action.payload.success
        },
        myCourseFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        delCourseRequest: (state) => {
            state.loading = true;
        },
        delCourseSuccess: (state, action) => {
            state.loading = false;
            state.course.filter((crs) => crs._id !== action.payload);
        },
        delCourseFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {myCourseRequest, myCourseSuccess, myCourseFail, delCourseFail, delCourseRequest, delCourseSuccess} = reducer.actions;

export default reducer.reducer