'use strict';

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { connectionDB } from "./mongo.js";
import authRoutes from "../src/Auth/auth.routes.js";
import userRoutes from "../src/User/user.routes.js";
import productRoutes from "../src/Product/product.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import categoryRoutes from "../src/category/category.routes.js";
import invoiceRoutes from "../src/invoice/invoice.routes.js";
import shopRoutes from "../src/shop/shop.routes.js";


const middlewares = (app) => {
    app.use(express.json());
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(apiLimiter);

};

const connectionMongo = async() =>{
    try{
        await connectionDB();
    }catch(error){
        console.log(`Data Base connection is failed, please try again ${e}`);
    }
};

const routes = (app) =>{
    app.use("/proyectoBimestral/v1/auth", authRoutes);
    app.use("/proyectoBimestral/v1/user", userRoutes);
    app.use("/proyectoBimestral/v1/product", productRoutes);
    app.use("/proyectoBimestral/v1/category", categoryRoutes);
    app.use("/proyectoBimestral/v1/invoice", invoiceRoutes);
    app.use("/proyectoBimestral/v1/shop", shopRoutes);
};

export const initServer = () => {
    const app = express();
    const timeInit = Date.now();
    try{
        middlewares(app);
        connectionMongo();
        routes(app);
        app.listen(process.env.PORT);
        const elapsedTime = Date.now() - timeInit;
        console.log(`Server running on port ${process.env.PORT} ${elapsedTime}ms`);
    }catch(error){
        console.log(`Server failed to start: ${error}`);
    }
};