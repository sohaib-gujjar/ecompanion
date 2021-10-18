import { plainToClass } from 'class-transformer';
import * as express from 'express';
import validateDTO from '../../@base/middleware/validateDTO.middleware';
import CreateTeamsDTO from '../dto/create-teams.dto';
import { User } from '../model/user.entity';
import TeamService from '../service/teams.service';

export default class TeamController {
    public path = '/team';
    public router = express.Router();
    private service = new TeamService();

    constructor(app: express.Application) {
        this.router.use(function (req, res, next) {
            console.log('Teams controller :', req.originalUrl)
            next()
        });
        this.initializeRoutes();
        app.use("/", this.router);
    }

    public initializeRoutes() {
        this.router.get(`${this.path}`, this.getAll);
        this.router.get(`${this.path}/user`, this.getUserWorkspace);
        
        this.router.post(`${this.path}`, validateDTO(CreateTeamsDTO), this.create);
        this.router.put(`${this.path}`, validateDTO(CreateTeamsDTO), this.update);
        this.router.delete(`${this.path}`, this.delete);

        this.router.post(`${this.path}/join/:teamId/:userId`, this.joinTeam);
        this.router.post(`${this.path}/remove/:teamId/:userId`, this.unJoinTeam);
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
            const item: any = await this.service.getUserWorkspaceTeams(user.id);
            res.status(200).send(item);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    create = async (req: express.Request, res: express.Response) => {
        try {
            const dto = plainToClass(CreateTeamsDTO, req.body);
            let results = await this.service.create(dto);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    update = async (req: express.Request, res: express.Response) => {
        try {
            const dto = plainToClass(CreateTeamsDTO, req.body);
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

    joinTeam = async (req: express.Request, res: express.Response) => {
        try {
            const teamId = req.params.teamId;
            const userId = req.params.userId;
            let results = await this.service.joinTeams(teamId, userId);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    unJoinTeam = async (req: express.Request, res: express.Response) => {
        try {
            const teamId = req.params.teamId;
            const userId = req.params.userId;
            let results = await this.service.unJoinTeams(teamId, userId);
            res.status(200).send(results);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}