import { MigrationInterface, QueryRunner, createQueryBuilder } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../modules/model/user.entity';

export class FillData implements MigrationInterface {

  name= "FillData";
  
  public async up(queryRunner: QueryRunner): Promise<any> {
    
    
    console.log('Fill user');
    /*const users = await queryRunner.manager.getRepository<User>(User).save(
      plainToClass(User, [
        {
          email: 'admin@admin.com',
          firstName: 'admin',
          lastName: 'one',
          password: "test",
        },
        {
          email: 'admin2@admin.com',
          firstName: 'admin',
          lastName: 'two',
          password: "test",
        },
        {
          email: 'test@test.com',
          firstName: 'test',
          lastName: 'one',
          password: "test",
        },
      ]),
    );

    console.log('Fill Workspace');*/

  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
