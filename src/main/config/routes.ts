import { Express, Router } from "express";
import { mapProjectFiles } from "@shared/utils/files";
import { ROOT_FOLDER } from "@main/constants/path";
import { specs, swaggerUi } from "./swagger";

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

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Text Sentiment Analysis API Documentation",
      customfavIcon: "/favicon.ico",
      swaggerOptions: {
        docExpansion: "list",
        filter: true,
        showRequestHeaders: true,
        showResponseHeaders: true,
      },
    }),
  );

  const routes = mapRoutes();

  routes.map(async (route) => {
    if (route.includes(".test.")) return;

    (await import(route)).default(router);
  });
};
