import authRouter from "./auth.router.js";
import { Router } from "express";
const routes = Router();

routes.use("/auth", authRouter);

export default routes;
