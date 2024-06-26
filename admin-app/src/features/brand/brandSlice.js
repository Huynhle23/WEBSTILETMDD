import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import brandService from './brandService'


export const getBrands = createAsyncThunk('brand/get-brand',async(thunkAPI)=>{
    try {
        return await brandService.getBrands() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdBrand = createAsyncThunk('brand/get-id-brand',async(id,thunkAPI)=>{
    try {
        return await brandService.getIdBrand(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateBrand = createAsyncThunk('brand/update-brand',async(brandData,thunkAPI)=>{
    console.log(brandData)
    try {
        return await brandService.updateBrand(brandData) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBrans = createAsyncThunk('brand/create-brand',async(brand,thunkAPI)=>{
    try {
        return await brandService.createBrand(brand) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteBrand = createAsyncThunk('brand/delete-brand',async(id,thunkAPI)=>{
    try {
        return await brandService.deleteBrand(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    brands :[],
    createBrand:"",
    brandName:"",
    updateName:"",
    deleteBrand:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const brandSlice = createSlice({
    name : "brand",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getBrands.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBrands.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all brand successfully"
            state.brands = action.payload
        })
        .addCase(getBrands.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        
        // create
        builder.addCase(createBrans.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createBrans.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "createGet all brand successfully"
            state.createBrand = action.payload
        })
        .addCase(createBrans.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // get id 
        builder.addCase(getIdBrand.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdBrand.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id brand successfully"
            state.brandName = action.payload?.getBrand?.title
        })
        .addCase(getIdBrand.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // update 
        builder.addCase(updateBrand.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateBrand.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "update brand successfully"
            state.updateName = action.payload?.udBrand
            state.isLoading = false
        })
        .addCase(updateBrand.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // delete 
        builder.addCase(deleteBrand.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteBrand.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "delete brand successfully"
            state.deleteBrand = action.payload
            state.isLoading = false
        })
        .addCase(deleteBrand.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        .addCase(resetState, () => initialState);
    }
})

export default brandSlice.reducer