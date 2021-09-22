import { plainToClass } from 'class-transformer';
import * as express from 'express';
import validateDTO from '../../@base/middleware/validateDTO.middleware';
import CreateTeamsMessageDTO from '../dto/create-teams-message.dto';
import CreateUserMessageDTO from '../dto/create-user-message.dto';
import CreateWorkSpaceMessageDTO from '../dto/create-workspace-message.dto';
import SlackService from '../service/slack.service';

export default class SlackController {
    public path = '/slack';
    public router = express.Router();
    private service = new SlackService();

    constructor(app: express.Application) {
        // middleware for slack controller
        this.router.use(function (req, res, next) {
            console.log('Slack controller :', req.originalUrl)
            next()
        });
        this.initializeRoutes();
        app.use("/", this.router);
    }

    public initializeRoutes() {
        this.router.get(`${this.path}/getUserWorkspace/:email`, this.getUserWorkspace);
        this.router.get(`${this.path}/getUserTeams/:email`, this.getUserTeams);
        this.router.get(`${this.path}/getUserDirectChats/:email`, this.getUserDirectChats);

        this.router.get(`${this.path}/getWorkspaceChat/:id`, this.getWorkspaceChat);
        this.router.get(`${this.path}/getTeamsChat/:id`, this.getTeamsChat);
        this.router.get(`${this.path}/getDM/:fromId/:toId`, this.getDM);
        
        this.router.post(`${this.path}/userMessage`, validateDTO(CreateUserMessageDTO), this.userMessage);
        this.router.post(`${this.path}/teamsMessage`, validateDTO(CreateTeamsMessageDTO), this.teamsMessage);
        this.router.post(`${this.path}/workspaceMessage`, validateDTO(CreateWorkSpaceMessageDTO), this.workspaceMessage);
    }

    getUserWorkspace = async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const item: any = await this.service.getUserWorkspace(email);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    getUserTeams = async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const item: any = await this.service.getUserTeams(email);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    getUserDirectChats = async (req: express.Request, res: express.Response) => {
        try {
            const email = req.params.email;
            const item: any = await this.service.getUserDirectChats(email);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }


    getWorkspaceChat = async (req: express.Request, res: express.Response) => {
        try {
            const id = req.params.id;
            const item: any = await this.service.getWorkspaceChat(id);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    getTeamsChat = async (req: express.Request, res: express.Response) => {
        try {
            const id = req.params.id;
            const item: any = await this.service.getTeamsChat(id);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
    getDM = async (req: express.Request, res: express.Response) => {
        try {
            const fromId = req.params.fromId;
            const toId = req.params.toId;
            const item: any = await this.service.getDM(fromId, toId);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    userMessage = async (req: express.Request, res: express.Response) => {
        try {
            console.log(req.body)
            const dto: CreateUserMessageDTO = plainToClass(CreateUserMessageDTO, req.body);
            let results = await this.service.createUserMessage(dto);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    teamsMessage = async (req: express.Request, res: express.Response) => {
        try {
            const dto: CreateTeamsMessageDTO = plainToClass(CreateTeamsMessageDTO, req.body);
            let results = await this.service.createTeamsMessage(dto);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    workspaceMessage = async (req: express.Request, res: express.Response) => {
        try {
            const dto: CreateWorkSpaceMessageDTO = plainToClass(CreateWorkSpaceMessageDTO, req.body);
            let results = await this.service.createWorkspaceMessage(dto);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}