import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import {toast} from "react-toastify"



export const postQr = createAsyncThunk("contact/postquery",async(contactData,thunkApi)=>{
    try{
        return await contactService.postQuery(contactData)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})



export const resetState = createAction("Reset_all");

const initialState = {
    contact : "",
    isError:false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export const contactSlice = createSlice({
    name : "contact",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(postQr.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(postQr.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.contact=action.payload
            if(state.isSuccess == true){
                toast.success("Contact from submited successfully")
            }
        })
        .addCase(postQr.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
            if(state.isError == true){
                toast.success(action.error)
            }
        })

        
    }
})

export default contactSlice.reducer