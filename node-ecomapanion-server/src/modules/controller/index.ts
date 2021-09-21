import express from "express";
import SlackController from "./slack.router";
import { router as UserRouter } from "./user.routes"

export function RegisterRoutes(app: express.Application) {
    app.use("/", UserRouter);
    const slack = new SlackController(app);
}