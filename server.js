const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mysql
const routes = require("./routes/route");

//squelize route
const route1 = require("./routes/infoRoute");
app.use("/api/users_info", route1);

app.use("/", routes);

// app.use("/", route1);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
