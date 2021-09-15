import express from "express";
import { router as UserRouter } from "./user.routes"

export function RegisterRoutes(app: express.Application) {
    app.use("/", UserRouter);
}