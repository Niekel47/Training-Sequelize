// import route express
import { Router } from "express";

// Import route from module
import authRouter from "../modules/auth/auth.router.js";
import userRouter from "..//modules/user/user.router.js";

const routes = Router();
routes.use("/auth", authRouter);
routes.use("/user", userRouter);

export default routes;
