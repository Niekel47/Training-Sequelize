// import route express
import { Router } from "express";

// Import route from module
import authRouter from "../modules/auth/auth.router.js";
import userRouter from "..//modules/user/user.router.js";
import productRouter from "../modules/product/product.router.js"
import roleRouter from "../modules/role/role.router.js"


const routes = Router();
routes.use("/auth", authRouter);
routes.use("/user", userRouter);
routes.use("/product", productRouter);
routes.use("/role", roleRouter);

export default routes;
