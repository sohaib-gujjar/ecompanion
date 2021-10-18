import { plainToClass } from 'class-transformer';
import * as express from 'express';
import validateDTO from '../../@base/middleware/validateDTO.middleware';
import CreateWorkspaceDTO from '../dto/create-work-space.dto';
import { User } from '../model/user.entity';
import WorkspaceService from '../service/workspace.service';

export default class WorkspaceController {
    public path = '/workspace';
    public router = express.Router();
    private service = new WorkspaceService();

    constructor(app: express.Application) {
        this.router.use(function (req, res, next) {
            console.log('Workspace controller :', req.originalUrl)
            next()
        });
        this.initializeRoutes();
        app.use("/", this.router);
    }

    public initializeRoutes() {
        this.router.get(`${this.path}`, this.getAll);
        this.router.get(`${this.path}/user`, this.getUserWorkspace);
        this.router.get(`${this.path}/search/:string`, this.searchByName);
        
        this.router.post(`${this.path}`, validateDTO(CreateWorkspaceDTO), this.create);
        this.router.put(`${this.path}`, validateDTO(CreateWorkspaceDTO), this.update);
        this.router.delete(`${this.path}`, this.delete);

        this.router.post(`${this.path}/join/:wsId/:userId`, this.joinWS);
        this.router.post(`${this.path}/remove/:wsId/:userId`, this.unJoinWS);
    }

    getAll = async (req: express.Request, res: express.Response) => {
        try {
            const item: any = await this.service.getAll();
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    getUserWorkspace = async (req: express.Request, res: express.Response) => {
        try {
            const user = plainToClass(User, req.user);
            const item: any = await this.service.getUserWorkspace(user.id);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
    searchByName = async (req: express.Request, res: express.Response) => {
        try {
            const string = req.params.string;
            const item: any = await this.service.searchByName(string);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    create = async (req: express.Request, res: express.Response) => {
        try {
            const dto: CreateWorkspaceDTO = plainToClass(CreateWorkspaceDTO, req.body);
            let results = await this.service.create(dto);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    update = async (req: express.Request, res: express.Response) => {
        try {
            const dto: CreateWorkspaceDTO = plainToClass(CreateWorkspaceDTO, req.body);
            let results = await this.service.update(dto);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    delete = async (req: express.Request, res: express.Response) => {
        try {
            const id = req.params.id;
            let results = await this.service.delete(id);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    joinWS = async (req: express.Request, res: express.Response) => {
        try {
            const wsId = req.params.wsId;
            const userId = req.params.userId;
            let results = await this.service.joinWS(wsId, userId);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    unJoinWS = async (req: express.Request, res: express.Response) => {
        try {
            const wsId = req.params.wsId;
            const userId = req.params.userId;
            let results = await this.service.unJoinWS(wsId, userId);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}