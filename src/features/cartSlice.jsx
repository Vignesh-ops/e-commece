import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../services/api'


export const fetchCartData = createAsyncThunk('cart/fetchCartData', async (product) => {
    const res = await api.get('cart')
    return res.data
})

export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
    console.log('product', product)

    const res = await api.get(`cart?id=${product.id}`)
    const existing = res.data[0]
    if (existing) {
        return await api.put(`cart/${existing.id}`, {
            ...existing,
            quantity: existing.quantity + 1
        }).then((res) => res.data)
    } else {
        return await api.post('cart', {
            ...product, quantity: 1
        }).then((res) => res.data)
    }
})

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
    await api.delete(`cart/${id}`)
    return id;
})

export const clearCartitems = createAsyncThunk('cart/clearCartitems', async (items) => {
    await items.map((item)=> api.delete(`cart/${item.id}`))
})  



export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async (product) => {
    console.log('product', product)

    if (product.quantity > 1) {
        return api.put(`cart/${product.id}`, {
            ...product,
            quantity: product.quantity - 1
        }).then((res)=>res.data)
    } else {
        return api.delete(`cart/${product.id}`).then((res) => res.data)
    }
})

export const increaseQuantity = createAsyncThunk('cart/increaseQuantity', async (product) => {
    return api.put(`cart/id=${product.id}`, {
        ...product,
        quantity: product.quantity + 1
    }).then((res) => res.data)
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'loading',
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.items = []
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCartData.pending, (state) => {
            state.status = 'loading'
        })
            .addCase(fetchCartData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchCartData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                const existing = state.items.find((item) => item.id == action.payload.id)
                if (existing) {
                    existing.quantity = action.payload.quantity
                } else {
                    state.items.push(action.payload)
                }
            })

            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload)
            })

            .addCase(decreaseQuantity.fulfilled, (state, action) => {
                const findDecreasedItem = state.items.find((item) => item.id == action.payload.id)
                if (findDecreasedItem && action.payload.quantity >= 1) {
                    findDecreasedItem.quantity = action.payload.quantity
                } else {
                    console.log('else',findDecreasedItem,action.payload.id)
                    state.items = state.items.filter((item) => item.id !== action.payload.id)
                }

            })
            .addCase(clearCartitems.fulfilled,(state)=>{
                state.items = []
            })
    }

});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;