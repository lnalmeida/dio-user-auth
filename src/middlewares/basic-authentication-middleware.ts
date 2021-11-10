import {Request, Response ,NextFunction } from "express";
import HttpStatusCode from "../consts/HttpStatusCode";
import AuthRepository from "../repositories/auth.repository";


const httpStatusCode = HttpStatusCode;


export default async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        
        if (!req.headers['authorization']) {
            return res.status(httpStatusCode.UNAUTHORIZED).send('Credenciais não informadas!');
        } 
         const [authType, token] = req.headers.authorization.split(' ');
         if (authType !== 'Basic' || !token) {
             return res.status(httpStatusCode.UNAUTHORIZED).send('Tipo de autenticação inválido');
         }
         const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
         const [username, password] = decodedToken.split(':');
    
         if (!username || !password) {
             return res.status(httpStatusCode.UNAUTHORIZED).send('Credenciais inválidas!');
         }
    
         const user = await AuthRepository.getUserByUsernameAndPassword(username, password);
        
         if (!user) {
           return res.status(httpStatusCode.UNAUTHORIZED).send('Acesso Negado!');
        } 

        req.user = user;
        next();

    } catch (error) {
        next(error)
    }
    
}