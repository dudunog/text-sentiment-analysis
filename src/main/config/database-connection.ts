import logger from "@main/adapters/logger-adapter";
import sqlite3 from "sqlite3";

export default async () => {
  try {
    logger.mapperInfo("Connecting to database...");

    const database = new sqlite3.Database("./sqlite/db.db", (err) => {
      if (err) {
        logger.mapperError(err.message);
        throw err;
      }
      logger.mapperInfo("Connection with database established!");
    });

    return database;
  } catch (error) {
    logger.mapperError(error);
    throw error;
  }
};
