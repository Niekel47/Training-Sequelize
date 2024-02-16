const express = require("express");
const app = express();
const port = 3000;

// Connect to database
const sequelize = require("./src/config/db");

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection DATABASE successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.get("/user", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
