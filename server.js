const express = require("express");
const connectDb = require("./config/dbCennection");
const errorHandler = require("./middleware/errorhandler");

connectDb();
const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

// app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, (request, response) => {
  console.log(`listening port ${port}`);
});
