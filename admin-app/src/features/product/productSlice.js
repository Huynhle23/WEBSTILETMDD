import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import productService from './productService'


export const getProducts = createAsyncThunk('product/get-product',async(thunkAPI)=>{
    try {
        return await productService.getProducts() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getaProduct = createAsyncThunk('product/get-a-product',async(id,thunkAPI)=>{
    try {
        return await productService.getaProduct(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createProducts = createAsyncThunk('product/create-product',async(product,thunkAPI)=>{
    try {
        return await productService.createProducts(product) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const UdProducts = createAsyncThunk('product/update-product',async(data,thunkAPI)=>{
    try {
        return await productService.udProduct(data) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deletePr = createAsyncThunk('product/delete-product',async(id,thunkAPI)=>{
    try {
        return await productService.deleteProduct(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction("Reset_all");
const initialState = {
    products :[],
    createdProduct:"",
    deletePro:"",
    aPr:"",
    udPr:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const productSlice = createSlice({
    name : "product",
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(getProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all user successfully"
            state.products = action.payload
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        builder.addCase(getaProduct.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getaProduct.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get a all product successfully"
            state.aPr = action.payload
        })
        .addCase(getaProduct.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(createProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.createdProduct = action.payload
        })
        .addCase(createProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(deletePr.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deletePr.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.deletePro = action.payload
        })
        .addCase(deletePr.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(UdProducts.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(UdProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.udPr = action.payload
        })
        .addCase(UdProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(resetState, () => initialState);
    }
})

export default productSlice.reducer