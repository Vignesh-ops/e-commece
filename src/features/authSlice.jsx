import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";



export const login = createAsyncThunk('auth/login', async (userCredentials, thunkAPI) => {

    try {
        const lgn = await api.get(`users?email=${userCredentials.email}&password=${userCredentials.password}`)
        if (lgn.data.length > 0) {
            return lgn.data[0]
        } else {
            return thunkAPI.rejectWithValue('Invalid Credentials')
        }
    } catch (err) {

        return thunkAPI.rejectWithValue(err.message)
    }
})

export const register = createAsyncThunk('auth/register', async (regCredentials, thunkAPI) => {

    try {
        const res = await api.get(`users?email=${regCredentials.email}`)

        if (res.data.length > 0) {
            return thunkAPI.rejectWithValue('Email Already exists')
        } else {
            const res = await api.post(`users`, { ...regCredentials })
            if (res) {
                return res.data
            }
        }
    } catch (err) {
        if(err.status === 404){
            const res = await api.post(`users`, { ...regCredentials })
            if (res) {
                return res.data
            }
        }
        return thunkAPI.rejectWithValue(err.message)
    }

})


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isregistered: null,
        isloading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null,
                localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isloading = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.isloading = false
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.isloading = false
                state.error = action.payload
            })
            .addCase(register.fulfilled, (state) => {
                state.isregistered = true
                state.error = null
            })
            .addCase(register.rejected, (state, action) => {
                console.log(action)
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;