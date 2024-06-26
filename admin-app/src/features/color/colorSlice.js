// cho kết nối useDispatch 
import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import colorService from './colorService'


export const getColor = createAsyncThunk('color/get-color',async(thunkAPI)=>{
    try {
        return await colorService.getColor()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createColor = createAsyncThunk('color/create-color',async(color,thunkAPI)=>{
    try {
        return await colorService.createColor(color) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdColor = createAsyncThunk('color/get-id-color',async(id,thunkAPI)=>{
    try {
        return await colorService.getIdColor(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateColor = createAsyncThunk('color/update-color',async(colorData,thunkAPI)=>{
    console.log(colorData)
    try {
        return await colorService.updateColor(colorData) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteColor = createAsyncThunk('color/delete-color',async(id,thunkAPI)=>{
    try {
        return await colorService.deleteColor(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    colors :[],
    create:"",
    colorName:"",
    updateName:"",
    deleteColor:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const pcategorySlice = createSlice({
    name : "color",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getColor.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getColor.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all color successfully"
            state.colors = action.payload
        })
        .addCase(getColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        builder.addCase(createColor.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createColor.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create color successfully"
            state.create = action.payload
        })
        .addCase(createColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        builder.addCase(getIdColor.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdColor.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id color successfully"
            state.colorName = action.payload?.getColor?.title
        })
        .addCase(getIdColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // update 
        builder.addCase(updateColor.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateColor.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "update color successfully"
            state.updateName = action.payload?.udBrand
            state.isLoading = false
        })
        .addCase(updateColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // delete 
        builder.addCase(deleteColor.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteColor.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "delete color successfully"
            state.deleteColor = action.payload
            state.isLoading = false
        })
        .addCase(deleteColor.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
    }
})

export default pcategorySlice.reducer