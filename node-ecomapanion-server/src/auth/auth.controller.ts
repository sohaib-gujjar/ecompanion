import express, { NextFunction, Request, Response } from "express";
import validateDTO from "../@base/middleware/validateDTO.middleware";
import AuthService from "./auth.service";
import LoginDTO from "./login.dto";

/**
 * Router Definition
 */
export const AuthRouter = express.Router();
const jwt = require("jsonwebtoken");

const path = "/auth";
const service = new AuthService();

AuthRouter.post(`${path}/login`, validateDTO(LoginDTO), async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    console.log("login", req.body)

    service.login(req.body)
    .then(async user => {
      if(user) {
        console.log(user.email);

        try {
          const token = jwt.sign(
            { id: user.email, user: { firstname: user.firstName, lastname: user.lastName}, exp: 60000, },
            process.env.TOKEN_KEY
          );
  
          console.log("token", token)
          console.log("session", req.session)
          req.session.regenerate(function (err) {
            if(err){
              return res.json({code: 500, msg: 'session error'});
            }
            req.session = token;
          });
  
          res.cookie("token", token, {httpOnly: true, secure: process.env.ENVIRONMENT === "production"})
            .header("x-auth-token", token)
            .status(200)
            .json({ message: "Logged in successfully 😊 👌", user: { email: user.email, firstname: user.firstName, lastname: user.lastName} });
          
        } catch (error) {
          console.log(error)
          throw error;
        }
        }
    })
    .catch(err => res.status(401).send({message: err}))




    /*passport.authenticate('local', { session: false }, (err, user, info) => {

      console.log("sdasdasd")
      if (err) {
        return next(err);
      }

      if (user) {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);

        const token = jwt.sign(
          { user_id: user.email, user: user, exp: expirationDate.getTime() / 1000, },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        // save user token
        user.token = token;

        req.session.cookie = token;

        // user
        res.header("x-auth-token", token).status(200).json(user);
        req.session.regenerate(function () {

        });
      } else {
        res.status(500).send("No user");
      }

      return res.status(400).send();
    })(req, res, next);*/

  } catch (e) {
    res.status(500).send({message: e.message});
  }
});

AuthRouter.post(`${path}/register`, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    console.log("register", body)
    service.register(body)
      .then(result => res.status(200).send(result))
      .catch(err => res.status(500).send(err));
  } catch (e) {
    res.status(500).send(e.message);
  }
});

AuthRouter.get(`${path}/logout`, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const items: any = await service.logout(body);
    res.clearCookie('token');
    req.session.destroy(function(){
      res.status(201).send({message: "logout"});
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});