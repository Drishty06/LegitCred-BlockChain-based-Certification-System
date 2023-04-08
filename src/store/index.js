import { configureStore } from "@reduxjs/toolkit";
import certificateSlice from "./certificate-slice";

const store = configureStore({
    reducer: {
        CertificateSlice: certificateSlice.reducer,
    },
});

export default store;
