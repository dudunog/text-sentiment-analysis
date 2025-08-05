import express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";
import setupDatabase from "./database-connection";

const makeApp = async () => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  await setupDatabase();

  return app;
};

export default makeApp;
