const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;
const mongo = require("./config/connection");

app.use(express.json());
app.use(express.static("public"));

app.use(routes);

// mongoose.connect(""
// )
mongo.once("open", () => {
  app.listen(PORT, () => console.log(`app running at ${PORT}`));
});
