const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandle } = require("./middlewares/errorHandle");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const blogRoute = require("./routes/blogRoute");
const categoryRoute = require("./routes/productCategoryRoute");
const blogCatRoute = require("./routes/blogCatRoute");
const brandRoute = require("./routes/brandRoute");
const colorRoute = require("./routes/colorRoute");
const couponRoute = require("./routes/couponRoute");
const enqRoute = require("./routes/enqRoute");
const uploadRoute = require("./routes/uploadRoute");

dotenv.config();
dbConnect();

const app = express();

// Apply CORS middleware and configure it
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow requests from these origins
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/user", authRoute);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/category", categoryRoute);
app.use("/api/blogcategory", blogCatRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/color", colorRoute);
app.use("/api/enq", enqRoute);
app.use("/api/upload", uploadRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandle);

const PORT = 8000;

app.listen(8000, () => {
  console.log(`Server is running on port ${PORT}`);
});
