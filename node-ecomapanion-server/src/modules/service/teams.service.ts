import { getConnection, getManager, getRepository, Like } from "typeorm";
import CreateTeamsDTO from "../dto/create-teams.dto";
import Teams from "../model/team.entity";
import { User } from "../model/user.entity";
import Workspace from "../model/workspace.entity";

/**
 * Export Workspace Service.
 */
export default class TeamService {

    /**
     * get
     */
    public async getAll(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection().getRepository(Teams).find();
                resolve(results);
            } catch (error) {
                reject(error)
            }
        });
    }

    public async getUserWorkspaceTeams(id: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection()
                    .createQueryBuilder(Teams, "teams")
                    .leftJoinAndSelect("teams.workspace", "workspace")
                    .leftJoinAndSelect("workspace.users", "user", "user.id=:id", { id: id })
                    //.where("user.id=:id", { id: id})
                    .getMany();

                resolve(results);
            } catch (error) {
                reject(error)
            }
        });
    }

    public async joinTeams(teamId: string, userId: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                getManager().getRepository(Teams).findOne({ id: teamId })
                    .then(team => {
                        if (team) {
                            getManager().getRepository(User).find({ id: userId })
                                .then(user => {
                                    if (user) {
                                        getManager().createQueryBuilder()
                                            .relation(User, 'teams')
                                            .of(user)
                                            .add(team.id)
                                            .then(
                                                data => {
                                                    resolve(data)
                                                },
                                                err => { reject(err) }
                                            )
                                    }
                                    else reject('User not found!')
                                },
                                    error => reject(error)
                                )
                        }
                        else reject('Team not found!')
                    })
                    .catch(err => reject(err))
            } catch (error) {
                reject(error)
            }
        });
    };

    public async unJoinTeams(teamId: string, userId: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                console.error("------------ teams remove **************", userId, "----temmm----", teamId)
                getManager().getRepository(User).findOne({
                    relations: ["teams"],
                    where: {
                        id: userId
                    }
                })
                .then(
                    async user => {
                        console.error("teams remove user found")
                        let result = await getRepository(User)
                        .createQueryBuilder()
                        .relation(User, "teams")
                        .of(user)
                        .remove(teamId)

                        resolve(result);
                    }
                )
                .catch(err => reject(err))

                
            } catch (error) {
                reject(error)
            }
        });
    };

    public async create(dto: CreateTeamsDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                getManager().getRepository(Workspace).findOne({ id: dto.workspace.id })
                    .then(
                        async ws => {
                            let t: Teams = new Teams();
                            t.name = dto.name;
                            t.workspace = ws;
                            resolve(await getManager().getRepository(Teams).create(t))
                        },
                        error => reject(error)
                    )

            } catch (error) {
                reject(error)
            }
        });
    };

    public async update(dto: CreateTeamsDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let ws: Teams = await getManager().getRepository(Teams).findOne({ id: dto.id });
                ws.name = dto.name;
                resolve(await getManager().getRepository(Teams).update(dto.id, ws));
            } catch (error) {
                reject(error)
            }
        });
    };

    public async delete(id: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                resolve(await getManager().getRepository(Teams).delete(id));
            } catch (error) {
                reject(error)
            }
        });
    };
}