import userRouter from "./user.router.js";
import { Router } from "express";
const routes = Router();

routes.use("/user", userRouter);


export default routes;
