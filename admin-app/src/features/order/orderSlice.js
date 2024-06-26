import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import orderSevice from './orderSevice'





// PUT 
export const updateOrder = createAsyncThunk('order/update-update-order',async(data,thunkAPI)=>{
    try {
        return await orderSevice.updateOder(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


const initialState = {
    orders:[],
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}


export const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // PUT
        builder.addCase(updateOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "update order successfully"
        })
        .addCase(updateOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
    }
})
export default orderSlice.reducer