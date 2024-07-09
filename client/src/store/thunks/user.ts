import { createAsyncThunk } from "@reduxjs/toolkit";
import user from "@requests/user";

const isAuthenticated = createAsyncThunk("users/is-authenticated", async () => {
    const response = await user.isAuthenticatedRequest();

    return response;
});

export { isAuthenticated };
