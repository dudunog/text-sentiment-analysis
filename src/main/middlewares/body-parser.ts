import { json, urlencoded } from "express";

export const bodyParserJson = json();

export const bodyParserUrlEncoded = urlencoded({ extended: false });
