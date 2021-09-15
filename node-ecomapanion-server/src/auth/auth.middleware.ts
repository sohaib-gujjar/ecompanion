const jwt = require("jsonwebtoken");



export default function authorizationMiddleware(req: any, res: any, next: any) {

    if(req.originalUrl.startsWith('/auth/')) {return next();}

    console.log("session", req.session, req.session.token);
    
    const token = req.headers["x-access-token"] || req.headers["authorization"] || req.cookies.token;
    console.log("token", token);

    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        console.log("authorization", authorization);
        //authorization.split(' ')[1];
    }
    

    if (!token) {
        return res.status(403).send("Access denied.");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};