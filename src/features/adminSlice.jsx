import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../services/api'


export const fetchProducts = createAsyncThunk('admin/fetchProducts', async () => {
    const res = await api.get('products')
    return res.data
})
export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
    const res = await api.get('users')
    return res.data
})

export const editproducts = createAsyncThunk('admin/editproducts', async (product) => {
    const res = await api.put(`products/${product.id}`, {
        ...product
    })
    return res.data
})

export const edituser = createAsyncThunk('admin/edituser', async (user) => {
    const res = await api.put(`users/${user.id}`, {
        ...user
    })
    return res.data
})

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        products: [],
        users: [],
        error: null,
        status: 'pending'
    },
    reducers: {
        resetStatus: (state) => {
            state.status = 'idle';
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(editproducts.fulfilled, (state, action) => {
                const find = state.products.findIndex((product) => product.id == action.payload.id)
                if (find !== -1) {
                    state.products[find] = action.payload
                }
                state.status = 'success'

            })
            .addCase(editproducts.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(editproducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(edituser.fulfilled, (state, action) => {
                const find = state.users.findIndex((user) => user.id == action.payload.id)
                if (find !== -1) {
                    state.users[find] = action.payload
                }
                state.status = 'success'
                state.error = null
            })
            .addCase(edituser.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(edituser.pending, (state) => {
                state.status = 'loading'
            })
    }
})



export const { resetStatus } = adminSlice.actions
export default adminSlice.reducer;