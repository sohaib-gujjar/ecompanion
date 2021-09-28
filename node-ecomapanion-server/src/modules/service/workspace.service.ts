import { getConnection, getManager, getRepository, Like } from "typeorm";
import CreateWorkspaceDTO from "../dto/create-work-space.dto";
import { User } from "../model/user.entity";
import Workspace from "../model/workspace.entity";

/**
 * Export Workspace Service.
 */
export default class WorkspaceService {

    /**
     * get
     */
    public async getAll() : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection().getRepository(Workspace).find();
                resolve(results);
            } catch (error) {
                reject({error})
            }
        });
    }

     public async getUserWorkspace(id: string) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                /*const results = await getConnection().getRepository(User).findOne({
                    relations: ["workspace"],
                    where: {
                        id: id
                    }
                });*/
                const results = await getConnection()
                    .createQueryBuilder(Workspace, "workspace")
                    .leftJoinAndSelect("workspace.users", "user", "user.id=:id", { id: id})
                    //.where("user.id=:id", { id: id})
                    .getMany();

                resolve(results);
            } catch (error) {
                reject({error})
            }
        });
    }

    public async searchByName(string: string) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection().getRepository(Workspace).find({
                    where: {
                        name: Like("%"+ string +"%")
                    }
                });
                resolve(results);
            } catch (error) {
                reject({error})
            }
        });
    }

    public async joinWS(wsId: string, userId: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                getManager().getRepository(Workspace).findOne({id: wsId})
                .then( ws => {
                    if(ws) {
                        getManager().getRepository(User).find({id: userId})
                            .then(async user => {
                                if(user) {
                                    
                                        await getManager().createQueryBuilder()
                                            .relation(User, 'workspace')
                                            .of(user)
                                            .add(ws.id)
                                        
                                        resolve({message: "User added to workspace"});
                                    
                                }
                                else reject({message: 'User not found!'})
                            })
                            .catch(err => reject({err}))
                    }
                    else reject({message: "Workspace not found!"})
                })
                .catch(err => reject({err}))
            } catch (error) {
                reject({error})
            }
        });
    };


    public async unJoinWS(wsId: string, userId: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                getRepository(User).findOne({
                    relations: ["workspace", "teams", "teams.workspace"],
                    where: {
                        id: userId
                    }
                })
                .then(
                    async user => {

                        user.teams.map(async team => {
                            if( team.workspace.id === wsId) {
                                await getRepository(User)
                                        .createQueryBuilder()
                                        .relation(User, "teams")
                                        .of(user)
                                        .remove(team.id)
                            }
                        })


                        user.workspace.map(async workspace => {
                            if( workspace.id === wsId) {
                                await getRepository(User)
                                        .createQueryBuilder()
                                        .relation(User, "workspace")
                                        .of(user)
                                        .remove(wsId)
                            }
                        })


                        resolve(user)
                    }
                )
                .catch(err => reject({err}))

                
            } catch (error) {
                reject({error})
            }
        });
    };

    public async create (dto: CreateWorkspaceDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let ws: Workspace = new Workspace();
                ws.name = dto.name;
                resolve(await getManager().getRepository(Workspace).create(ws))
            } catch (error) {
                reject({error})
            }
        });
    };

    public async update (dto: CreateWorkspaceDTO): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let ws: Workspace = await getManager().getRepository(Workspace).findOne({id: dto.id});
                ws.name = dto.name;
                resolve(await getManager().getRepository(Workspace).update(dto.id, ws));
            } catch (error) {
                reject({error})
            }
        });
    };

    public async delete (id: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                resolve(await getManager().getRepository(Workspace).delete(id));
            } catch (error) {
                reject({error})
            }
        });
    };
}