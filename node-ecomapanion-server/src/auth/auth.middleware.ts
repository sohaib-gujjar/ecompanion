const jwt = require("jsonwebtoken");



export default function authorizationMiddleware(req: any, res: any, next: any) {


    if(req.originalUrl.startsWith('/auth/') || req.originalUrl.startsWith('/slack/') || req.originalUrl.startsWith('/upload')) {return next();}

    console.log("session?", req.session);
    
    //const authHeader = req.headers.authorization;
    //console.log("authHeader", authHeader);
    
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    console.log("token?", token);

    /*const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        console.log("authorization", authorization);
        //authorization.split(' ')[1];
    }*/
    

    if (!token || token === undefined) {
        return res.status(403).send("Access denied.");
    }
    try {

        // if bearer
        
        //const token_data = token.split(' ')[1];

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);


        console.log("decoded---", decoded)
        
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};