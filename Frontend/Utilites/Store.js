import { configureStore } from "@reduxjs/toolkit";
import Authorization from "./Slice.js";

const appStore = configureStore({
    reducer: {
        authorization : Authorization
    }
});
export default appStore;