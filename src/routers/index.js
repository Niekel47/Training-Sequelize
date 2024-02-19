import userRouter from "./userRouter.js";

function route(app) {
  app.use("/api/user", userRouter);
}

export default route;
