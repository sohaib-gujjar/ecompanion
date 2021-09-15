import CreateUserDto from "../modules/model/user/user.dto";
import { User } from "../modules/model/user/user.entity";
import UserService from "../modules/service/user.service";
import LoginDTO from "./login.dto";
import bcryptjs from "bcryptjs";
/**
 * Export functionality.
 */
export default class AuthService {

    constructor(public service = new UserService()){}
    /**
     * login
     */
    public async login(data: LoginDTO) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.service.getByEmail(data.email)
                .then(async (user) => {
                    if (user) {
                        let isUser = await bcryptjs.compare(data.password, user.password);
                        if(isUser) {
                            resolve(user)
                        }
                        else {
                            reject("Authentication failed!")
                        }
                      }
                    else {
                        reject("No user exists with this email!")
                    }
                })
                .catch(err => reject(err));
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     * register
     */
     public async register(data: CreateUserDto) : Promise<[any]> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                this.service.getByEmail(data.email)
                .then(async (user) => {
                    console.log("user",user)
                    if (user) {
                        reject("User already exists!");
                      }
                    else {
                        const salt = await bcryptjs.genSalt(10);
                        const hashPassword = await bcryptjs.hash(data.password, salt);
                        
                        data.password = hashPassword;

                        this.service.create(data)
                        .then(result => resolve(result))
                        .catch(err => resolve(err))
                    }
                })
                .catch(err => reject(err));
            } catch (error) {
                reject(error)
            }
        });
    }

    /**
     * logout
     */
     public async logout(data: any) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                resolve("logout")
            } catch (error) {
                reject(error)
            }
        });
    }
}