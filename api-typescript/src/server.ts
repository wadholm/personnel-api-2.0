import express from "express";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import employeeRoutes from "./routes/Employee";


const app = express();

app.use(cors());

mongoose.connect(config.mongo.url)
.then(() => {
    Logging.info("Connected to MongoDB. ");
    StartServer();
}).catch((err) => {
    Logging.error("Unable to connect. ")
    Logging.error(err);
});

const StartServer = () => {
    app.use((req, res, next) => {
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - 
        Ip: [${req.socket.remoteAddress}]`);

        res.on("finish", () => {
            Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - 
            Ip: [${req.socket.remoteAddress}] - Status: [${req.statusCode}]`);
        })

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req, res, next) => {
        res.header("Access-Cotrol-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }

        next();
    });

    app.use('/api/v1/employees', employeeRoutes);
    app.get("/ping", (req, res, next) => res.status(200).json({ message: "pong"}));

    app.use((req, res, next) => {
        const error = new Error("not found");
        Logging.error(error);

        return res.status(404).json({ message: error.message});
    });

    http.createServer(app).listen(config.server.port, () => 
    Logging.info(`Personnel API running on port ${config.server.port}`));
};