const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoute = require("./routers/user"); // User route
const listRouter = require("./routers/list"); // User route 

app.use(cors()); 
app.use(express.urlencoded({extended:true}))
// Connect to MongoDB
async function main() {
    await mongoose.connect(process.env.MONGOOSE_URL);
}
main()
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((e) => {
        console.error("Database connection failed:", e);
        process.exit(1);
    });

// Middleware
app.use(express.json()); // Parse JSON payloads

// Routes
app.use("/user", userRoute);
app.use("/list", listRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
