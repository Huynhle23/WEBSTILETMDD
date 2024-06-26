import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import customerService from './customerService'
// redux tolkit gồm 3 bước :
/**
 * b1 : kết nối  service để làm việc với backend
 * b2 : tạo giá trị ban đầu
 * b3 : tạo các action
 */


export const getUsers = createAsyncThunk('customer/get-customers',async(thunkAPI)=>{
    try {
        return await customerService.getUsers() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
// tạo giá trị ban đầu cho state
const initialState = {
    customers :[],
    isError : false,
    isLoading:false,
    isSeccess:false,
    message:""
}

export const customerSlice = createSlice({
    name : "customer",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(getUsers.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSeccess = true
            state.message = "Get all user successfully"
            state.customers = action.payload
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSeccess = false
            state.message = action.error
        })
    }
})

export default customerSlice.reducer