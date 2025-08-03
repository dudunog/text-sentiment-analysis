import { adaptRoute } from "@main/adapters/express-adapter";
import { Router } from "express";
import { makeAnalyzeTextFactory } from "@contexts/text-analysis/external/factories/analyze-text.factory";

export default (router: Router) => {
  router.post("/analyze-text", adaptRoute(makeAnalyzeTextFactory()));
};
