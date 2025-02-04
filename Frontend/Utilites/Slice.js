import { createSlice } from "@reduxjs/toolkit";

const Authorization = createSlice({
    name: "authorization",
    initialState: {
        token: "",
    },

    reducers : {
        setToken : (state,action)=> {
            state.token=action.payload;
        }
    }
});

export const{setToken}=Authorization.actions;
export default Authorization.reducer;