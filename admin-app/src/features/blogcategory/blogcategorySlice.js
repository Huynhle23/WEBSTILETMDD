import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import blogcategoryService from './blogcategoryService'


export const getblogCategory = createAsyncThunk('blogcategories/get-blogcategories',async(thunkAPI)=>{
    try {
        return await blogcategoryService.getblogcategory()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createBlogCate = createAsyncThunk('blogcategory/create-blogcategory',async(blogcategory,thunkAPI)=>{
    try {
        return await blogcategoryService.createBlogCategory(blogcategory) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getABlogCat = createAsyncThunk(
  "blogCategory/get-blogcategory",
  async (id, thunkAPI) => {
    try {
      return await blogcategoryService.getIdBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateABlogCat = createAsyncThunk(
  "blogCategory/update-blogcategory",
  async (blogCat, thunkAPI) => {
    try {
      return await blogcategoryService.updateBlogCategory(blogCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlogCat = createAsyncThunk(
  "blogCategory/delete-blogcategory",
  async (id, thunkAPI) => {
    try {
      return await blogcategoryService.deleteBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
    blogCategories :[],
    create:"",
    blogCategoryName:"",
    updateName:"",
    deleteBlogCategory:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const blogcategorySlice = createSlice({
    name : "blogCategories",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getblogCategory.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getblogCategory.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all blog Categories successfully"
            state.blogCategories = action.payload
        })
        .addCase(getblogCategory.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        builder.addCase(createBlogCate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createBlogCate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create blog Categories successfully"
            state.create = action.payload
        })
        .addCase(createBlogCate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(getABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategoryName = action.payload.getbgCategory.title;
      })
      .addCase(getABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateName = action.payload;
      })
      .addCase(updateABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteBlogCategory = action.payload;
      })
      .addCase(deleteABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

        .addCase(resetState, () => initialState);

    }
})

export default blogcategorySlice.reducer