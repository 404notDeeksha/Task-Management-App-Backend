const env = require("./config/envValidator");
const dbConnection = require("./config/dbConnection");
const app = require("./app");

if (process.env.NODE_ENV !== "test") {
  console.log(`🟢 Starting server`);
  dbConnection();

  const port = env.PORT;
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}
