import "dotenv/config";
import "./websocket";
import "./console";
import path from "path";
import url from "node:url";
import { UrlWithStringQuery } from "url";

export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const PORT = process.env.PORT ?? 3000;
export const URL: UrlWithStringQuery = url.parse(
  process.env.URL ?? `http://localhost:${process.env.PORT}`
);
export const IS_SSL = NODE_ENV === "production" && URL.protocol === "https:";
export const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === "true";
export const MAINTENANCE_MODE_WHITELIST_IPS = process.env
  .MAINTENANCE_MODE_WHITELIST_IPS
  ? process.env.MAINTENANCE_MODE_WHITELIST_IPS.split(",")
  : [];
// Mandatory configs
export const PUBLIC_DIR = path.join(__dirname, "../../public");
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN!;
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN!;
export const DATABASE_URL = process.env.DATABASE_URL!;
export const DATABASE_NAME = process.env.DATABASE_NAME!;
export const SKIP_VALIDATION = process.env.SKIP_VALIDATION === "true";
export const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR);
export const WEBSOCKET_SERVER_URL = IS_SSL
  ? `wss://${URL.host}`
  : `ws://${URL.host}`;
export const WEBSOCKET_SERVER_KEY = process.env.WEBSOCKET_SERVER_KEY!;
export const PAGE_SIZES = JSON.parse(process.env.PAGE_SIZES!) as {
  [key: string]: number;
};

const Environment = {
  verify: new Promise((resolve, reject) => {
    if (!PUBLIC_DIR) {
      reject(new Error("PUBLIC_DIR is not defined"));
    }
    if (!PORT) {
      reject(new Error(`PORT is not defined`));
    }
    if (!DATABASE_URL) {
      reject(new Error("DATABASE_URL is not defined"));
    }
    if (!DATABASE_NAME) {
      reject(new Error("DATABASE_NAME is not defined"));
    }
    if (!ACCESS_TOKEN_SECRET) {
      reject(new Error("ACCESS_TOKEN_SECRET is not defined"));
    }
    if (!ACCESS_TOKEN_EXPIRES_IN) {
      reject(new Error("ACCESS_TOKEN_EXPIRES_IN is not defined"));
    }
    if (!FRONTEND_ORIGIN) {
      reject(new Error("FRONTEND_ORIGIN is not defined"));
    }
    if (typeof SKIP_VALIDATION !== "boolean") {
      reject(new Error("SKIP_VALIDATION is not defined"));
    }
    if (SALT_WORK_FACTOR < 1) {
      reject(new Error("SALT_WORK_FACTOR is not defined"));
    }
    if (!WEBSOCKET_SERVER_URL) {
      reject(new Error("WEBSOCKET_SERVER_URL is not defined"));
    }
    if (!WEBSOCKET_SERVER_KEY) {
      reject(new Error("WEBSOCKET_SERVER_KEY is not defined"));
    }
    if (PAGE_SIZES === undefined) {
      if (Object.keys(PAGE_SIZES).length === 0) {
        reject(new Error("PAGE_SIZES does not have any value"));
      }
      reject(new Error("PAGE_SIZES is not defined"));
    }
    resolve("Environment variables are set correctly");
  })
    .then((message) => {
      console.success(message);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    }),
};

export default Environment;
