import express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

const makeApp = async () => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
};

export default makeApp;
