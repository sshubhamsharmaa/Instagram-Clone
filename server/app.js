const express = require("express");
const PORT = 5000;
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo");
});

require("./models/user");
require("./models/post");
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
