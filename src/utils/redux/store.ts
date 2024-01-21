import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist';
import counterSlice from "./feature/counterSlice";
import notesSlice from "./feature/notesSlice";
import cartSlice from "./feature/cartSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const reducer = combineReducers({
    counter: counterSlice.reducer,
    notes: notesSlice.reducer,
    cart: cartSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;