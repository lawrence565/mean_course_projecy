import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import authRoute from "./routes/auth.js";
import courseRoute from "./routes/course-route.js";
import passportConfig from "./config/passport.js";

// 初始化 `express`
const app = express();

// 加載環境變量
dotenv.config();

// 配置 Passport
passportConfig(passport);

mongoose
  .connect("mongodb://localhost:27017/merndb")
  .then(() => {
    console.log("Connecting to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
//需保護CourseRoute，只有登入系統&&是Instructor的人才能使用
app.use(
  "/api/course",
  // passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8080, () => {
  console.log("backend server is running on port8080");
});
