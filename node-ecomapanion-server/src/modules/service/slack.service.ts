import { getConnection, getManager } from "typeorm";
import Message from "../model/message.entity";
import Teams from "../model/team.entity";
import { User } from "../model/user.entity";
import Workspace from "../model/workspace.entity";

/**
 * Export Slack functionality.
 */
export default class SlackService {

    /**
     * getUserWorkspace
     */
    public async getUserWorkspace(email: string) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {

                const results = await getConnection()
                    .createQueryBuilder(Workspace, "workspace")
                    .leftJoin('workspace.users', 'user')
                    .where('user.email = :email', { email: email })
                    .getMany();

                resolve(results);
            } catch (error) {
                reject(error)
            }
        });
    }
    /**
     * getUserTeams
     */
     public async getUserTeams(email: string) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection()
                    .createQueryBuilder(Teams, "teams")
                    .leftJoin('teams.users', 'user')
                    .where('user.email = :email', { email: email })
                    .getMany();

                resolve(results);
            } catch (error) {
                reject(error)
            }
        });
    }
    /**
     * getUserDirectChats
     */
     public async getUserDirectChats(email: string) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection()
                    .createQueryBuilder(User, "user")
                    .distinct(true)
                    .leftJoin('user.messages', 'message')
                    .leftJoinAndSelect('message.toUser', 'toUser')
                    .where('toUser.email = :email', { email: email })
                    .getMany();

                resolve(results);
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     * getWorkspaceChat
     */
     public async getWorkspaceChat(id: string) : Promise<[any]> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection()
                    .createQueryBuilder(Message, "message")
                    .leftJoin('message.workspaceMessage', 'workspace')
                    .leftJoinAndSelect('message.user', 'user')
                    .where('workspace.id = :id', { id: id })
                    .orderBy('message.createdAt', 'ASC')
                    .getMany();
                
                resolve(results);
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     * getTeamsChat
     */
     public async getTeamsChat(id: string) : Promise<[any]> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection()
                    .createQueryBuilder(Message, "message")
                    .leftJoin('message.teamsMessage', 'teams')
                    .leftJoinAndSelect('message.user', 'user')
                    .where('teams.id = :id', { id: id })
                    .orderBy('message.createdAt', 'ASC')
                    .getMany();
                
                resolve(results);
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     * get all DM
     */
     public async getDM(fromId: string, toId: string) : Promise<[any]> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const results = await getConnection()
                    .createQueryBuilder(Message, "message")
                    .leftJoinAndSelect('message.user', 'user')
                    .leftJoin('message.toUser', 'toUser')
                    .where('user.id = :fromId and toUser.id = :toId', { toId: toId, fromId: fromId })
                    .orWhere('user.id = :fromId2 and toUser.id = :toId2', { fromId2: toId, toId2: fromId })
                    /*.where(subQb => {
                        subQb.where('user.id = :fromId', { fromId: fromId });
                        subQb.andWhere('toUser.id = :toId', { toId: toId });
                    })
                    .orWhere(subQb2 => {
                        subQb2.where('user.id = :fromId2', { fromId2: toId });
                        subQb2.andWhere('toUser.id = :toId2', { toId2: fromId });
                    })*/
                    .orderBy('message.createdAt', 'ASC')
                    .getMany();
                
                //const results = await getManager().query(`SELECT * FROM message where userId='${fromId}' and toUserId='${toId}';`);
                
                resolve(results);
            } catch (error) {
                reject(error)
            }
        });
    }

    public async create (data: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
               resolve(data);

            } catch (error) {
                reject(error)
            }
        });
    };

    public async update (id: string, data: any): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                resolve(data);
            } catch (error) {
                reject(error)
            }
        });
    };

    public async delete (id: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                resolve(id);
            } catch (error) {
                reject(error)
            }
        });
    };
}