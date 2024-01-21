import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increment(state) {
            state.count++;
        },
        decrement(state) {
            if (state.count > 0) {
                state.count--;
            }
        },
        reset(state) {
            state.count = 0;
        }
    }
});

export const counterActions = counterSlice.actions;
export default counterSlice;