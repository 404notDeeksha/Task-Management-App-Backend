const env = require("./config/envValidator");
const dbConnection = require("./config/dbConnection");
const app = require("./app");

if (process.env.NODE_ENV !== "test") {
  // if (process.env.NODE_ENV === "development") {
  console.log(`🟢 Starting server`, process.env.NODE_ENV);
  // }
  dbConnection();

  const port = env.PORT;

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
