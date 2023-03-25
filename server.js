const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const userRoute = require("./routes/userRoute");
const driverRoute = require("./routes/driverRoute");
const clientRoute = require("./routes/clientRoute");
const carRoute = require("./routes/carRoute");
const routesRoute = require('./routes/routesRoute');
const eventsRoute = require("./routes/eventsRoute");
const taskRoute = require("./routes/taskRoute")
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(cookieParser());
// app.use(express.json()); 
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/drivers", driverRoute);
app.use("/api/clients", clientRoute);
app.use("/api/cars", carRoute);
app.use("/api/routes", routesRoute);
app.use("/api/events", eventsRoute );
app.use("/api/tasks", taskRoute);
// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

// Connect to DB and start server
const PORT = config.get('port');
mongoose
  .connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
    })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));