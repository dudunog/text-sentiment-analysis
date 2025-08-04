import { adaptRoute } from "@main/adapters/express-adapter";
import { Router } from "express";
import { makeAnalyzeTextFactory } from "@contexts/text-analysis/external/factories/analyze-text.factory";
import { makeSearchTermFactory } from "../factories/search-term.factory";

export default (router: Router) => {
  router.post("/analyze-text", adaptRoute(makeAnalyzeTextFactory()));
  router.get("/search-term", adaptRoute(makeSearchTermFactory()));
};
