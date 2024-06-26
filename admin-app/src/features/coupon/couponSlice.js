import { createSlice ,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import couponService from './couponService'


export const getCoupons = createAsyncThunk('coupon/get-all-coupon',async(thunkAPI)=>{
    try {
        return await couponService.getCoupons() 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createCoupons = createAsyncThunk('coupon/create-coupon',async(coupon,thunkAPI)=>{
    try {
        return await couponService.createCoupon(coupon) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getIdCoupon = createAsyncThunk('coupon/get-id-coupon',async(id,thunkAPI)=>{
    try {
        return await couponService.getIdCoupon(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCoupon = createAsyncThunk('coupon/update-coupon',async(couponData,thunkAPI)=>{
    console.log(couponData)
    try {
        return await couponService.updateCoupon(couponData) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCoupon = createAsyncThunk('coupon/delete-coupon',async(id,thunkAPI)=>{
    try {
        return await couponService.deleteCoupon(id) 
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all");

const initialState = {
    coupons :[],
    createCoupon:"",
    couponName:"",
    couponDiscount:"",
    couponExpiry:"",
    updateName:"",
    deleteCoupon:{},
    isError : false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const couponSlice = createSlice({
    name : "coupon",
    initialState,
    reducers:{},
    // trang thai
    extraReducers:(builder)=> {
        builder.addCase(getCoupons.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getCoupons.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get all coupon successfully"
            state.coupons = action.payload
        })
        .addCase(getCoupons.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // create
        builder.addCase(createCoupons.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(createCoupons.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "create coupon successfully"
            state.createCoupon = action.payload
        })
        .addCase(createCoupons.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // get id 
        builder.addCase(getIdCoupon.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getIdCoupon.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = "Get id coupon successfully"
            state.couponName = action.payload?.getACoupon.name
            state.couponExpiry = action.payload?.getACoupon.expiry
            state.couponDiscount = action.payload?.getACoupon.discount
        })
        .addCase(getIdCoupon.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })


        // update 
        builder.addCase(updateCoupon.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateCoupon.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "update coupon successfully"
            state.updateName = action.payload?.udCoupon
            state.isLoading = false
        })
        .addCase(updateCoupon.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        // delete 
        builder.addCase(deleteCoupon.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteCoupon.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.message = "delete coupon successfully"
            state.deleteCoupon = action.payload
            state.isLoading = false
        })
        .addCase(deleteCoupon.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })

        .addCase(resetState, () => initialState);
    }
})

export default couponSlice.reducer