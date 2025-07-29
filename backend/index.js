import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 8080;
const app = express();
const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

const corsOptions = {
    origin: "https://careenow-1.onrender.com",
    credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve frontend
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
