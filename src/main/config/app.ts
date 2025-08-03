import express from "express";
import setupMiddlewares from "./middlewares";

const makeApp = async () => {
  const app = express();
  setupMiddlewares(app);

  return app;
};

export default makeApp;
