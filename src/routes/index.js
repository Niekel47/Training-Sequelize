// import route express
import { Router } from "express";

// Import route from module
import authRouter from "../modules/auth/auth.router.js";
import userRouter from "..//modules/user/user.router.js";
import productRouter from "../modules/product/product.router.js";
import categoryRouter from "../modules/category/category.router.js"
import authorRouter from "../modules/author/author.router.js";
import publisherRouter from "../modules/publisher/publisher.router.js";
import uploadRouter from "../modules/upload/upload.router.js"

const routes = Router();
routes.use("/auth", authRouter);
routes.use("/user", userRouter);
routes.use("/product", productRouter);
routes.use("/category", categoryRouter);
routes.use("/author", authorRouter);
routes.use("/publisher", publisherRouter);
routes.use("/upload", uploadRouter);

export default routes;
