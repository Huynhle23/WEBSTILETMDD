import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";
const getTokenFromLocalStorage = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : null;

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      return await authService.registerUser(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await authService.loginUser(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAllWishList = createAsyncThunk(
  "auth/get-wishlist",
  async (thunkApi) => {
    try {
      return await authService.getUserWishList();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const cart = createAsyncThunk(
  "auth/add-cart",
  async (cartData, thunkApi) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCart = createAsyncThunk(
  "auth/get-cart",
  async (cartData, thunkApi) => {
    try {
      return await authService.getCart(cartData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getMyorder = createAsyncThunk(
  "auth/get-order",
  async (cartData, thunkApi) => {
    try {
      return await authService.getOrder();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deletePrCart = createAsyncThunk(
  "auth/delete-cart",
  async (cartItemId, thunkApi) => {
    try {
      return await authService.removeProductCart(cartItemId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "auth/update-cart",
  async (cartDetail, thunkApi) => {
    try {
      return await authService.updateProductCart(cartDetail);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const emptycart = createAsyncThunk(
  "auth/empth-cart",
  async (thunkApi) => {
    try {
      return await authService.empty();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  user: getTokenFromLocalStorage,
  getWishList: "",
  ris: null,
  loginUser: "",
  orders: "",
  ToCart: "",
  delCart: "",
  udCart: "",
  cartUser: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ris = action.payload;
        if (state.isSuccess == true) {
          toast.info("User create success");
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError == true) {
          toast.error("Đăng kí thất bại");
        }
      });

    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loginUser = action.payload;
        if (state.isSuccess == true) {
          toast.info("Login success");
          sessionStorage.setItem("user", JSON.stringify(action.payload));
          sessionStorage.setItem("token", JSON.stringify(action.payload.token));
          // window.location.reload()
        } else if (state.isError === false) {
          toast.info("Login Faild");
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError == true) {
          toast.error(action.payload);
        }  else if (state.isError === false) {
            toast.info("Login Faild");
          }
      });

    builder
      .addCase(getAllWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getWishList = action.payload;
      })
      .addCase(getAllWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });

    builder
      .addCase(cart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.ToCart = action.payload;
        if (state.isSuccess) {
          toast.success("Product added to cart");
        }
      })
      .addCase(cart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });

    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartUser = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });

    builder
      .addCase(deletePrCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePrCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.delCart = action.payload;
        if (state.isSuccess === true) {
          toast.success("Product deleted !");
        }
      })
      .addCase(deletePrCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Something went wrong !");
        }
      });

    builder
      .addCase(updateQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.udCart = action.payload;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });

    builder
      .addCase(getMyorder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyorder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getMyorder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
    builder
      .addCase(emptycart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptycart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.empt = action.payload;
      })
      .addCase(emptycart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default authSlice.reducer;
