import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import pcategoryService from './pcategoryService'


export const getCategory = createAsyncThunk('category/get-category',async(thunkAPI)=>{
    try {
        return await pcategoryService.getPcategory()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createCategory = createAsyncThunk('category/create-category',async(category,thunkAPI)=>{
    try {
        return await pcategoryService.createCategory(category) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdCategory = createAsyncThunk('category/get-id-category',async(id,thunkAPI)=>{
    try {
        return await pcategoryService.getIdCategory(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCategory = createAsyncThunk('category/update-category',async(categoryData,thunkAPI)=>{
    console.log(categoryData)
    try {
        return await pcategoryService.updateCategory(categoryData) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCategory = createAsyncThunk('category/delete-category',async(id,thunkAPI)=>{
    try {
        return await pcategoryService.deleteCategory(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

const initialState = {
    categories :[],
    create:"",
    categoryName:"",
    updateName:"",
    deleteCategory:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const pcategorySlice = createSlice({
    name : "category",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all category successfully"
            state.categories = action.payload
        })
        .addCase(getCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        builder.addCase(createCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create category category successfully"
            state.create = action.payload
        })
        .addCase(createCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // get id 
        builder.addCase(getIdCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id category successfully"
            state.categoryName = action.payload?.getCategory?.title
        })
        .addCase(getIdCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // update 
        builder.addCase(updateCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateCategory.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "update category successfully"
            state.updateName = action.payload?.udBrand
            state.isLoading = false
        })
        .addCase(updateCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // delete 
        builder.addCase(deleteCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "delete category successfully"
            state.deleteCategory = action.payload
            state.isLoading = false
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
        
    }
})

export default pcategorySlice.reducer