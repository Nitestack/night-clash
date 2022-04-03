import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LayoutProps, MetaProps } from "@components/Layout";

const initialState: LayoutProps = {
    title: "Loading",
    description: "Please wait until the page is fully loaded!"
};

const layoutSlice = createSlice({
    name: "layout",
    initialState: initialState as LayoutProps,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                title: action.payload
            };
        },
        setDescription: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                description: action.payload
            };
        },
        setHeader: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                header: action.payload
            };
        },
        setScripts: (state, action: PayloadAction<Array<string>>) => {
            return {
                ...state,
                scripts: action.payload
            };
        },
        setMeta: (state, action: PayloadAction<MetaProps>) => {
            return {
                ...state,
                meta: action.payload
            };
        }
    }
});

export default layoutSlice;