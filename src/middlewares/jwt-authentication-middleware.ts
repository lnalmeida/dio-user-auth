import { Request, Response, NextFunction } from 'express';
import HttpStatusCode from "../consts/HttpStatusCode";
import JWT from 'jsonwebtoken';


const httpStatusCode = HttpStatusCode;

export default async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        
        const authHeader = req.headers['authorization'];

        if (!authHeader) { 
            return res.status(httpStatusCode.UNAUTHORIZED).send('Acesso negado!'); 
        }

        const [authType, token] = authHeader.split(' ');

        if (authType !== 'Bearer') {
            return res.status(httpStatusCode.UNAUTHORIZED).send('Tipo de autenticação inválido');
        }
        if (!token) {
            return res.status(httpStatusCode.UNAUTHORIZED).send('Token não informado');
        }

        const jwtSecret = process.env.JWT_SECRET || 'mySecret';
        const tokenPayload = JWT.verify(token, jwtSecret);
        try {
            if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
                return res.status(httpStatusCode.UNAUTHORIZED).send('Token inválido');
            }
            
            const user = {
                uuid: tokenPayload.sub,
                username: tokenPayload.username,
            }
    
            req.user = user;
    
            console.log(`User ${user.username} authenticated`);
    
            next()
        } catch (error) {
            return res.status(httpStatusCode.UNAUTHORIZED).send('Token inválido');
        }
    } catch (error:any) {
       next(error);
    }
};