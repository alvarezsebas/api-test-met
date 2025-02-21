import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import morgan from "morgan";


import {
  authRoutes,
  storeRoutes,
 
} from "./routes/index.js";



const app = express();


const server = http.createServer(app);


// Configure Body Parser
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
}))

// Configure Header HTTP - CORS
app.use(cors());

// Configure logger HTTP request
app.use(morgan("dev"));

// Configure routings
app.use("/api", authRoutes);
app.use("/api", storeRoutes);


export {  server };
// export {  server };
