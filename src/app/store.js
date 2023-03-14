import { configureStore } from "@reduxjs/toolkit";

import s3Reducer from './s3Slice';

export const store = configureStore( {
    reducer: {
        s3: s3Reducer
    }
});