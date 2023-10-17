const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/health-check", require("./routes/healthCheck.routes"));

app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/maps", require("./routes/maps.routes"));
app.use("/api/v1/patrols", require("./routes/patrols.routes"));
app.use("/api/v1/patrol-tasks", require("./routes/patrolTasks.routes"));
app.use("/api/v1/recognition-results", require("./routes/recognitionResults.routes"));
app.use("/api/v1/recognitions", require("./routes/recognitions.routes"));
app.use("/api/v1/reports", require("./routes/reports.routes"));
app.use("/api/v1/users", require("./routes/users.routes"));

app.use("/api/v1/combats", require("./routes/combats.routes"))
app.use("/api/v1/ambushes", require("./routes/ambushes.routes"))

module.exports = app;
