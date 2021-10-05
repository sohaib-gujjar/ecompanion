import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../../modules/model/user.entity';
import Workspace from '../../modules/model/workspace.entity';
import Teams from '../../modules/model/team.entity';
import Message from '../../modules/model/message.entity';
import File from '../../modules/model/file.entity';

export class FillData1632155121706 implements MigrationInterface {

  name= "FillData1632155121706";
  
  public async up(queryRunner: QueryRunner): Promise<any> {

    console.log('--------------------Files--------------------');
    const files = await queryRunner.manager.getRepository<File>(File).save(
      plainToClass(User, [
        {
          filename: 'user.png',
          path: '/uploads/avatars/user.png',
          ext: 'png',
          createdAt: new Date()
        },
        {
          filename: 'user_2.png',
          path: '/uploads/avatars/user_2.png',
          ext: 'png',
          createdAt: new Date()
        },
        {
          filename: 'user_3.png',
          path: '/uploads/avatars/user_3.png',
          ext: 'png',
          createdAt: new Date()
        },
        {
          filename: 'user_4.png',
          path: '/uploads/avatars/user_4.png',
          ext: 'png',
          createdAt: new Date()
        },
      ]),
    );

    
    
    console.log('--------------------Fill user--------------------');
    const users = await queryRunner.manager.getRepository<User>(User).save(
      plainToClass(User, [
        {
          email: 'test@test.com',
          firstName: 'test',
          lastName: 'one',
          password: "$2a$10$LY6Me51wMn9EUJadsHupA.iR7PL4RKT8kP8ftBMTRNw3VfvrGtgvS",
          description: "none",
          createdAt: new Date(),
          img: files[0]
        },
        {
          email: 'admin@admin.com',
          firstName: 'admin',
          lastName: 'one',
          password: "$2a$10$LY6Me51wMn9EUJadsHupA.iR7PL4RKT8kP8ftBMTRNw3VfvrGtgvS", // 12345678
          description: "none",
          createdAt: new Date(),
          img: files[1]
        },
        {
          email: 'admin2@admin.com',
          firstName: 'admin',
          lastName: 'two',
          password: "$2a$10$LY6Me51wMn9EUJadsHupA.iR7PL4RKT8kP8ftBMTRNw3VfvrGtgvS",
          description: "none",
          createdAt: new Date(),
          img: files[2]
        },
        {
          email: 'test2@test.com',
          firstName: 'test',
          lastName: 'two',
          password: "$2a$10$LY6Me51wMn9EUJadsHupA.iR7PL4RKT8kP8ftBMTRNw3VfvrGtgvS",
          description: "none",
          createdAt: new Date(),
          img: files[3]
        },
        {
          email: 'admin3@any.com',
          firstName: 'user',
          lastName: 'three',
          password: "$2a$10$LY6Me51wMn9EUJadsHupA.iR7PL4RKT8kP8ftBMTRNw3VfvrGtgvS",
          description: "none",
          createdAt: new Date(),
          img: files[4]
        },
      ]),
    );

    console.log('--------------------Fill Workspace--------------------');

    const ws = await queryRunner.manager.getRepository<Workspace>(Workspace).save(
      plainToClass(Workspace, [
        {
          name: "Project 1",
          createdAt: new Date()
        },
        {
          name: "Project 2",
          createdAt: new Date()
        },
        {
          name: "Project 3",
          createdAt: new Date()
        },
        {
          name: "Management",
          createdAt: new Date()
        },
        {
          name: "Finance",
          createdAt: new Date()
        },
        {
          name: "Robotics",
          createdAt: new Date()
        },
      ]),
    );


    console.log('--------------------Fill teams--------------------');

    const teams = await queryRunner.manager.getRepository<Teams>(Teams).save(
      plainToClass(Teams, [
        {
          name: "DevOps",
          createdAt: new Date(),
          workspace: ws[0]
        },
        {
          name: "Cloud",
          createdAt: new Date(),
          workspace: ws[0]
        },
        {
          name: "Backend",
          createdAt: new Date(),
          workspace: ws[0]
        },
        {
          name: "Design",
          createdAt: new Date(),
          workspace: ws[1]
        },
        {
          name: "Cloud",
          createdAt: new Date(),
          workspace: ws[1]
        },
        {
          name: "Backend",
          createdAt: new Date(),
          workspace: ws[1]
        },
        {
          name: "Frontend",
          createdAt: new Date(),
          workspace: ws[2]
        },
        {
          name: "Cloud",
          createdAt: new Date(),
          workspace: ws[2]
        },
        {
          name: "Backend",
          createdAt: new Date(),
          workspace: ws[2]
        },
        {
          name: "Financial Team",
          createdAt: new Date(),
          workspace: ws[3]
        },
        {
          name: "Invoice Team",
          createdAt: new Date(),
          workspace: ws[4]
        },
        {
          name: "Dynamics",
          createdAt: new Date(),
          workspace: ws[5]
        },
        {
          name: "Kinematics",
          createdAt: new Date(),
          workspace: ws[5]
        },
      ]),
    );

    console.log("--------------------Fill WS users-------------------------------");

    await getConnection().createQueryBuilder().relation(Workspace, "users").of(ws[0]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Workspace, "users").of(ws[0]).add(users[1]);
    await getConnection().createQueryBuilder().relation(Workspace, "users").of(ws[0]).add(users[2]);

    await getConnection().createQueryBuilder().relation(Workspace, "users").of(ws[1]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Workspace, "users").of(ws[1]).add(users[1]);


    await getConnection().createQueryBuilder().relation(Workspace, "users").of(ws[2]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Workspace, "users").of(ws[2]).add(users[2]);



    console.log("--------------------Fill Teams users-------------------------------");

    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[0]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[0]).add(users[1]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[0]).add(users[2]);

    
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[1]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[1]).add(users[1]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[1]).add(users[2]);

    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[2]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[2]).add(users[1]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[2]).add(users[2]);

    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[3]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[3]).add(users[1]);

    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[4]).add(users[1]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[4]).add(users[2]);

    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[5]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[5]).add(users[2]);

    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[6]).add(users[1]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[6]).add(users[2]);

    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[7]).add(users[0]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[7]).add(users[2]);

    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[8]).add(users[1]);
    await getConnection().createQueryBuilder().relation(Teams, "users").of(teams[8]).add(users[2]);


    console.log("--------------------Fill Emoji html codes-------------------------------");


    console.log("--------------------Fill Messages -------------------------------");

    var date = new Date();
    var i:number = 1;

    var add_minutes =  function (dt: Date, minutes: number) {
      var hours = Math.floor(Math.random() * 10);
      var month = Math.floor(Math.random() * 36);

      return new Date(dt.getTime() - (month * hours * minutes*60000)).toLocaleString("en-US");
    }

    
    const messages = await queryRunner.manager.getRepository<Message>(Message).save(
      plainToClass(Message, [
        {
          user: users[0],
          text: "Workspace 0 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[0]
        },
        {
          user: users[0],
          text: "Workspace 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[1]
        },
        {
          user: users[0],
          text: "Workspace 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[2]
        },
        {
          user: users[1],
          text: "Workspace  3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[0]
        },
        {
          user: users[1],
          text: "Workspace  4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[1]
        },
        {
          user: users[1],
          text: "Workspace  5 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[2]
        },
        {
          user: users[2],
          text: "Workspace  6 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[0]
        },
        {
          user: users[2],
          text: "Workspace  7 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[1]
        },
        {
          user: users[2],
          text: "Workspace  8 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          workspaceMessage: ws[2]
        },
        // Teams message  **********************************************************
        {
          user: users[0],
          text: "Teams message  0 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[0]
        },
        {
          user: users[0],
          text: "Teams message 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[1]
        },
        {
          user: users[0],
          text: "Teams message  3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[2]
        },
        {
          user: users[0],
          text: "Teams message 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[3]
        },
        {
          user: users[0],
          text: "Teams message  5 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[4]
        },
        {
          user: users[0],
          text: "Teams message 6 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[5]
        },
        {
          user: users[0],
          text: "Teams message  7 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[6]
        },
        {
          user: users[0],
          text: "Teams message  8 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[7]
        },
        {
          user: users[0],
          text: "Teams message  9 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[8]
        },
        // --------------------------------------------
        {
          user: users[1],
          text: "Teams message  10 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[0]
        },
        {
          user: users[2],
          text: "Teams message  11 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[1]
        },
        {
          user: users[1],
          text: "Teams message  12 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[2]
        },
        {
          user: users[2],
          text: "Teams message  13 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[3]
        },
        {
          user: users[1],
          text: "Teams message  14 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[4]
        },
        {
          user: users[2],
          text: "Teams message 15 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[5]
        },
        {
          user: users[1],
          text: "Teams message  16 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[6]
        },
        {
          user: users[2],
          text: "Teams message 17 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[7]
        },
        {
          user: users[2],
          text: "Teams message  18 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          teamsMessage: teams[8]
        },

        //*********************** */
        // Direct messages  ************************************************
        {
          user: users[0],
          text: "Direct messages 0 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          toUser: users[1]
        },
        {
          user: users[0],
          text: "Direct messages 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          toUser: users[2]
        },
        {
          user: users[1],
          text: "Direct messages 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          toUser: users[0]
        },
        {
          user: users[1],
          text: "Direct messages 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          toUser: users[2]
        },
        {
          user: users[2],
          text: "Direct messages 4 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          toUser: users[0]
        },
        {
          user: users[2],
          text: "Direct messages 5 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales.",
          createdAt: add_minutes(date,  i++),
          toUser: users[1]
        },


      ]),
    );


  }
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
