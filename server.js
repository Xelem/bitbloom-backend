const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { connectDB } = require("./database/db");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception, shutting down...");
  process.exit(1);
});

const app = require("./app");
const syncModels = require("./utils/syncModels");

connectDB();
syncModels();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection, shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
