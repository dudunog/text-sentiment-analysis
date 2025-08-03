import logger from "@main/adapters/logger-adapter";
import { AppDataSource } from "./database/data-source";

export default async () => {
  try {
    logger.mapperInfo("Connecting to database...");

    await AppDataSource.initialize();

    logger.mapperInfo("Connection with database established!");
  } catch (error) {
    logger.mapperError(error);
    throw error;
  }
};
