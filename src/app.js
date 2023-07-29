const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

app.set("port", 8080);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", require("./routes/auth.routes.js"));
app.use("/api/v1/maps", require("./routes/maps.routes"));
app.use("/api/v1/patrols", require("./routes/patrols.routes"));
app.use("/api/v1/patrol-tasks", require("./routes/patrolTasks.routes"));
app.use("/api/v1/recognition-results",require("./routes/recognitionResults.routes"));
app.use("/api/v1/recognitions", require("./routes/recognitions.routes"));
app.use("/api/v1/reports", require("./routes/reports.routes"));
app.use("/api/v1/users", require("./routes/users.routes"));

module.exports = app;
