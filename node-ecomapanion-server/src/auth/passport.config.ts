import passport from 'passport';
import passportLocal from 'passport-local';
import UserService from "../modules/service/user.service";
import bcryptjs from "bcryptjs";

const LocalStrategy = passportLocal.Strategy;
const service = new UserService();

// Passport 
passport.use(new LocalStrategy((email: string, password: string, done) => {
    
    console.log("passport",email)
    service.getByEmail(email)
        .then(async (user) => {
            if (user) {
                bcryptjs.compare(password, user.password, (err, isUser) => {
                    if (err) throw err;
                    if (isUser) {
                        done(null, user)
                    }
                    else {
                        done(null, false, { message: "Authentication failed!" })
                    }
                });

            }
            else {
                done(null, false, { message: "No user exists with this email!" })
            }
        })
        .catch(err => done(null, false, { message: err }));
})
);

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((id: string, done) => {
    service.getByEmail(id)
    .then( usr => done(null, usr))
    .catch(err => done(null, false));
});

export default passport;