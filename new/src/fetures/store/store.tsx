import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import {contactApi} from "../contactsquery"

export const store = configureStore({
    reducer:{
        [contactApi.reducerPath]: contactApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
})

setupListeners(store.dispatch)

