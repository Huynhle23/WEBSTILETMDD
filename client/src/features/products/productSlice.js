import { createSlice,createAsyncThunk,createAction } from "@reduxjs/toolkit";
import { productService } from "./productService";


export const getAllProduct = createAsyncThunk("products/getall",async(thunkApi)=>{
    try{
        return await productService.getAllProduct()
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const getAProduct = createAsyncThunk("products/get-product",async(id,thunkApi)=>{
    try{
        return await productService.getAProduct(id)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

export const addToWishList = createAsyncThunk("products/wishlist",async(proId,thunkApi)=>{
    try{
        return await productService.addToWishList(proId)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

export const searchInput = createAsyncThunk("products/get-search-product",async(keyword,thunkApi)=>{
    try{
        return await productService.search(keyword)
    }catch(error){
        return thunkApi.rejectWithValue(error)
    }
})

const initialState = {
    products: "",
    AProduct: "",
    searchPr:"",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    slugProduct:"",
};

export const productSlice = createSlice({
    name : "product",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProduct.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAllProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.products=action.payload
        })
        .addCase(getAllProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        
        builder.addCase(getAProduct.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getAProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.AProduct=action.payload
        })
        .addCase(getAProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        

        builder.addCase(addToWishList.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist=action.payload;
            state.message = "Product added to wishlist"
        })
        .addCase(addToWishList.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })

        builder.addCase(searchInput.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(searchInput.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.search=action.payload
        })
        .addCase(searchInput.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default productSlice.reducer