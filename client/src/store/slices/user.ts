import { createSlice } from "@reduxjs/toolkit";
import { User } from "@_types/auth";

export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    loading: "idle" | "pending" | "succeeded" | "failed";
    error?: object | null;
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
    loading: "idle",
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export default userSlice.reducer;
