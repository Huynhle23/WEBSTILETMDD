// cho kết nối useDispatch 
import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import enquiryService from './enquiryService'


export const getEnquiry = createAsyncThunk('enq/get-enq',async(thunkAPI)=>{
    try {
        return await enquiryService.getEnquiry()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdEnquiry = createAsyncThunk('enq/get-id-enq',async(id,thunkAPI)=>{
    try {
        return await enquiryService.getAEnquiry(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const delEnquiry = createAsyncThunk('enq/delete-enq',async(id,thunkAPI)=>{
    try {
        return await enquiryService.delEnquiry(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updEnquiry = createAsyncThunk('enq/update-enq',async(enq,thunkAPI)=>{
    try {
        return await enquiryService.updateEnquiry(enq)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    enquiries :[],
    delEq:"",
    getAEnq:"",
    udEnq:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const enquirySlice = createSlice({
    name : "enquiry",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getEnquiry.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getEnquiry.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all enquiries successfully"
            state.enquiries = action.payload
        })
        .addCase(getEnquiry.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false 
            state.message = action.error
        })

        builder.addCase(getIdEnquiry.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdEnquiry.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id enquiries successfully"
            state.getAEnq = action.payload
        })
        .addCase(getIdEnquiry.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false 
            state.message = action.error
        })

        builder.addCase(updEnquiry.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updEnquiry.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "update enquiries successfully"
            state.udEnq = action.payload
        })
        .addCase(updEnquiry.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false 
            state.message = action.error
        })


        // delete
        builder.addCase(delEnquiry.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(delEnquiry.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "delete enquiries successfully"
            state.delEq = action.payload
        })
        .addCase(delEnquiry.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        .addCase(resetState, () => initialState);

    }
})

export default enquirySlice.reducer