import userRouter from "./userRouter";

function route(app) {
  app.use("/user", userRouter);
}

export default route;
