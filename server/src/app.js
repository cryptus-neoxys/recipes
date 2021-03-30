import express from "express";
import cors from "cors";

import { router } from "./api/routes";
import { PORT, HOST } from "./config";
import logger from "./log/config";
// // import { notFound, responseHandler } from "./middleware";

// Initializing Express App
const app = express();

// CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// Body parser
app.use(express.json());

// Connect to Database
require("./database/database");

// Import routers
app.use("/api/", router);

// // Not found handler
// // app.use(notFound);

// // All response handlers
// // app.use(responseHandler);

// Start Express App
app.listen(PORT, HOST, () => {
  logger.info(`🚀 Server running on http://${HOST}:${PORT} 🚀`);
});
