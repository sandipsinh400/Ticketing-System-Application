import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";  
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const authReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
export const authPersist = persistStore(store);
