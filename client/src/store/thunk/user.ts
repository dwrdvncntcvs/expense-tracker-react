import { Response } from "@_types/api";
import { SignInData, SignUpData, User, UserResponse } from "@_types/auth";
import { user } from "@api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const isAuthenticatedRequest = createAsyncThunk<
    Response<UserResponse>,
    void,
    { rejectValue: { data: string } }
>("user/is-authenticated", async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
        const data = await user.isAuthenticatedRequest();

        return fulfillWithValue(data);
    } catch (err) {
        console.log(err);
        return rejectWithValue(err.response.data.message);
    }
});

export const signInRequest = createAsyncThunk<
    Response<UserResponse>,
    SignInData,
    { rejectValue: { data: string } }
>("user/sign-in", async (_user, { fulfillWithValue, rejectWithValue }) => {
    try {
        const data = await user.signInRequest(_user);

        return fulfillWithValue(data);
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

export const signUpRequest = createAsyncThunk<
    Response<User>,
    SignUpData,
    { rejectValue: { data: string } }
>("user/sign-up", async (_user, { fulfillWithValue, rejectWithValue }) => {
    try {
        const data = await user.signUpRequest(_user);

        return fulfillWithValue(data);
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

export const signOutRequest = createAsyncThunk<
    Response<any>,
    void,
    { rejectValue: { data: string } }
>("user/sign-out", async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
        const data = await user.signOutRequest();

        return fulfillWithValue(data);
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});
