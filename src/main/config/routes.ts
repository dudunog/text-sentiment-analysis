import { Express, Router } from "express";
import { mapProjectFiles } from "@shared/utils/files";
import { ROOT_FOLDER } from "@main/constants/path";

const mapRoutes = (): string[] => {
  const files = mapProjectFiles(ROOT_FOLDER);

  return files.filter(
    (file) =>
      file.includes(".route.ts") ||
      (file.includes(".route.js") && !file.includes(".route.js.map")),
  );
};

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);

  const routes = mapRoutes();

  routes.map(async (route) => {
    if (route.includes(".test.")) return;

    (await import(route)).default(router);
  });
};
