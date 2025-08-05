import { Express } from "express";
import {
  bodyParserJson,
  cors,
  security,
  bodyParserUrlEncoded,
} from "@main/middlewares";

export default (app: Express): void => {
  app.use(cors);
  app.use(bodyParserJson);
  app.use(bodyParserUrlEncoded);
  app.use(security);
};
