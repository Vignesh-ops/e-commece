import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";
import axios from "axios";



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


export const uploadimage = createAsyncThunk('auth/uploadimage', async(imagedata,thunkAPI)=>{
    try{
        const res = await axios.post('https://api.imgbb.com/1/upload?expiration=600&key=0900dcd8608d99eea05e26f31a2ace1e',imagedata)
        console.log('isplay_url',res.data)
        if (res.data.data.display_url)
        {
            const state = thunkAPI.getState()
            const user = state.auth.user
            console.log('user',user)
            const res2 = await api.put(`users/${user.id}`, { ...user, image:res.data.data.display_url })
            return res2.data;
        }
    }catch(err){
        return thunkAPI.rejectWithValue(err.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isregistered: null,
        isloading: false,
        error: null,
        status:'idle'
    },
    reducers: {
        logout: (state) => {
            state.user = null,
                localStorage.removeItem('user')
        },
        reset: (state)=>{
            state.status = 'idle'
            state.error = null
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
                state.error = action.payload
            })
            .addCase(uploadimage.pending,(state)=>{
                state.status ='pending'
                state.error = null
            })
            .addCase(uploadimage.fulfilled,(state,action)=>{
                state.user = action.payload
                localStorage.setItem('user',JSON.stringify(action.payload))
                state.error = null
                state.status ='success'
            })
            .addCase(uploadimage.rejected,(state,action)=>{
                state.error = action.error.message
                state.status ='idle'
                console.log('img upload',action)
            })
    }
})

export const { logout,reset } = authSlice.actions;
export default authSlice.reducer;