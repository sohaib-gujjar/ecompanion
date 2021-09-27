import express from "express";
import SlackController from "./slack.router";
import TeamController from "./team.router";
import { router as UserRouter } from "./user.routes"
import WorkspaceController from "./workspace.router";

export function RegisterRoutes(app: express.Application) {
    app.use("/", UserRouter);
    const slack = new SlackController(app);
    const ws = new WorkspaceController(app);
    const team = new TeamController(app);
}