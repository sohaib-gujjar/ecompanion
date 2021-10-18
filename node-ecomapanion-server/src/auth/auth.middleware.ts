const jwt = require("jsonwebtoken");



export default function authorizationMiddleware(req: any, res: any, next: any) {

    if(req.originalUrl.startsWith('/auth/')) {return next();}
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token || token === undefined) {
        return res.status(403).send("Access denied.");
    }
    try {

        // if bearer
        
        //const token_data = token.split(' ')[1];

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        req.user = decoded.user;

    } catch (err) {
        return res.status(401).send({message: "Invalid Token", err});
    }
    return next();
};