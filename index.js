const express = require('express');
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors')

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
    next();
});

// Database Connection
const connectDB = require("./config/database");
connectDB().then(r => console.log("Connected MongoDB"));

const {PublicRoutes, ProtectedRoutes} = require("./routes");
PublicRoutes(app);
ProtectedRoutes(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend server is running on ${port}!`);
});