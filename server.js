const express =require("express");

const dotenv =require("dotenv");

const cors =require("cors");

const connectDB =require("./config/db");
const authRouters=require("./routers/authRouters");
const registrationRouters=require("./routers/registrationRouters");
const eventRouters=require("./routers/eventRouters");
const adminRouters=require("./routers/adminRouters");

dotenv.config();

connectDB();

const app =express();

app.use(cors());

app.use(express.json());

app.use("/api/auth",authRouters);
app.use("/api/events",eventRouters);
app.use("/api/registrations",registrationRouters);
app.use("/api/admin",adminRouters);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On port ${PORT}`
  );
});