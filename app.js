const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { dbConnect, dbDisconnect } = require("./db");
const { SeedHandler } = require("./utils/seed");
const cors = require("cors");

require("dotenv").config();

//database connection
dbConnect();
dbDisconnect();

const allowedOrigins = [
  "http://localhost:3000",
  "https://simple-amazon-client.vercel.app",
  // Add more trusted origins as needed
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 3600,
};

//middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use("/api/auth", require("./routes/AuthRoutes"));
app.use("/api/user", require("./routes/UserRoutes"));
app.use("/api/products", require("./routes/ProductRoutes"));
app.use("/api/order", require("./routes/OrderRoutes"));

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port " + process.env.PORT);
});

SeedHandler();
