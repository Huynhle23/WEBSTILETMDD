import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { blogService } from "./blogService";


export const getAllblog = createAsyncThunk("blogs/getall",async(thunkApi)=>{
    try{
        return await blogService.getAllBlog()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getABlog = createAsyncThunk("blogs/getblog",async(id,thunkApi)=>{
    try{
        return await blogService.getBlog(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})



export const resetState = createAction("Reset_all");

const initialState = {
    blogs :"",
    isError:false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const blogSlice = createSlice({
    name : "blog",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllblog.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllblog.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs=action.payload
        })
        .addCase(getAllblog.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(getABlog.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getABlog.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.aBlog=action.payload
        })
        .addCase(getABlog.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default blogSlice.reducer