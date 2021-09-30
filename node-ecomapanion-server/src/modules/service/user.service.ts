import { getManager } from "typeorm";
import CreateUserDto from "../dto/create-user.dto";
import { User } from "../model/user.entity";

/**
 * Export functionality.
 */
export default class UserService {

    /**
     * getByEmail
     */
     public async getByEmail(email: string) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let user = await getManager().getRepository(User).findOne({
                    relations: ['img'],
                    where: {
                        email: email
                    }
                });
                resolve(user)
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     * get
     */
    public async get(id: string) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                resolve(await getManager().getRepository(User).findOne(id))
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     * get all
     */
     public async getAll() : Promise<[any]> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                resolve(await getManager().getRepository(User).find())
            } catch (error) {
                reject(error)
            }
        });
    }

    public async create (data: CreateUserDto): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let user = new User();
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.password = data.password;
                user.description = data.description;

                let result = await getManager().getRepository(User).insert(user);
                resolve(result);

            } catch (error) {
                reject(error)
            }
        });
    };

    public async update (id: string, data: CreateUserDto): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let user: User = await getManager().getRepository(User).findOne(id);
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.password = data.password;
                user.description = data.description;
                user.updatedAt = new Date();

                let result = await getManager().getRepository(User).update(id, user);
                resolve(result);
            } catch (error) {
                reject(error)
            }
        });
    };

    public async deleteWithID (id: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let user: User = await getManager().getRepository(User).findOne(id);
                resolve(await getManager().getRepository(User).remove(user));
            } catch (error) {
                reject(error)
            }
        });
    };
}