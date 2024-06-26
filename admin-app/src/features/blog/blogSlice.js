// cho kết nối useDispatch 
import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import blogService from './blogService'

export const getBlog = createAsyncThunk('blog/get-blog',async(thunkAPI)=>{
    try {
        return await blogService.getBlog()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const createBlog = createAsyncThunk('blog/create-blog',async(blog,thunkAPI)=>{
    try {
        return await blogService.createBlog(blog) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getABlog = createAsyncThunk(
  "blog/get-a-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getaBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateABlog = createAsyncThunk(
  "blog/update-blog",
  async (brand, thunkAPI) => {
    try {
      return await blogService.updateBlog(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlog = createAsyncThunk(
  "blog/delete-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
    blogs :[],
    create:"",
    blogName:"",
    blogDesc:"",
    blogCategory:"",
    blogImages:"",
    deletedBlog:"",
    updatedBlog:"",
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const blogSlice = createSlice({
    name : "blog",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all blog successfully"
            state.blogs = action.payload
        })
        .addCase(getBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        builder.addCase(createBlog.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createBlog.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all blog successfully"
            state.create = action.payload
        })
        .addCase(createBlog.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
         .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogName = action.payload?.updateViews?.title;
        state.blogDesc = action.payload?.updateViews?.description;
        state.blogCategory = action.payload?.updateViews?.category;
        state.blogImages = action.payload?.updateViews?.images;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
      })
      .addCase(updateABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
        .addCase(resetState, () => initialState);
    }
})

export default blogSlice.reducer