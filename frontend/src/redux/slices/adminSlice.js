import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch users

export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            }
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch users");
        }
    }
    );

    // Add the create user action

    export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, { rejectWithValue }) => {
        try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            userData,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            }
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add user");
        }
    }
    );

    // Update user Info

    export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async ({ id, name, email, role }) => {
        try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            { name, email, role },
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            }
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update user");
        }
    }
    );

    // Delete user

    export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
        const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            }
        );
        return response.data;
        } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete user");
        }
    }
    );

    const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const updatedUser = action.payload;
            const userIndex = state.users.findIndex(
            (user) => user._id === updatedUser._id
            );
            state.loading = false;
            if (userIndex !== -1) {
            state.users[userIndex] = updatedUser;
            }
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter((user) => user._id !== action.payload);
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload.user);
            // add a new user to the state
        })
        .addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});

export default adminSlice.reducer;
