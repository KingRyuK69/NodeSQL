const express = require("express");
const app = express();

//mysql
const routes = require("./routes/route");

// //mysql route
// const routes = require("./routes/route");
// app.use("/api/users", routes);

// //squelize route
// const route1 = require("./routes/infoRoute");
// app.use("/api/users_info", route1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
