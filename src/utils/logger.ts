// src/utils/logger.ts
import fs from "fs";
import path from "path";

const LOG_DIR = path.join("logs");
fs.mkdirSync(LOG_DIR, { recursive: true });

export function logError(message: string, error?: any) {
  const timestamp = new Date().toISOString();
  const logMessage =
    `[${timestamp}] ERROR: ${message}` +
    (error ? `\n${error.stack || error}\n` : "\n");

  // Write to console
  console.error(logMessage);

  // Append to file
  fs.appendFileSync(path.join(LOG_DIR, "errors.log"), logMessage, "utf-8");
}

export function logInfo(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] INFO: ${message}\n`;

  console.log(logMessage);
  fs.appendFileSync(path.join(LOG_DIR, "info.log"), logMessage, "utf-8");
}
