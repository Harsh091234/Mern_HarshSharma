import express from "express"
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js"
dotenv.config();

const app = express();
app.use(express.json()); 

app.use("/api/user", userRoutes);

app.listen(process.env.PORT, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});


