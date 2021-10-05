import CreateUserDto from "../modules/dto/create-user.dto";
import { User } from "../modules/model/user.entity";
import UserService from "../modules/service/user.service";
import LoginDTO from "./login.dto";
import bcryptjs from "bcryptjs";
import { getManager, getRepository } from "typeorm";
import File from "../modules/model/file.entity";
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
                        .then(async result => {
                            if(result.identifiers) {
                                resolve(await this.service.get(result.identifiers[0].id))
                            }
                            else reject(result)
                        })
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
     * Save File
     */
     public async saveUserImage(userId: string, file: File) : Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                getRepository(User).findOneOrFail(userId)
                .then(async user => {
                    console.log("file", file)
                    
                    const newFile = new File();
                    newFile.originalname = file.originalname;
                    newFile.filename = file.filename;
                    newFile.mimetype = file.mimetype;
                    newFile.ext = file.filename.substr(file.filename.lastIndexOf('.') + 1 );
                    newFile.path = file.path;
                    newFile.destination = file.destination;
                    newFile.size = file.size;
                    file.createdAt = new Date();

                    let savedFile = await getManager().getRepository(File).insert(newFile);

                    console.log("savedFile" , savedFile)



                    let res = await getManager().createQueryBuilder()
                                                .relation(User, 'img')
                                                .of(user)
                                                .set(savedFile.identifiers[0].id);
                    console.log("..>", res)

                                            


                    resolve(user)
                })
                .catch( err => reject(err))



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