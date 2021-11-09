import express, { Request, Response, NextFunction } from 'express';

import HttpStatusCode from '../../consts/HttpStatusCode';
import DatabaseError from '../../errors/database.error';
import AuthRepository from '../../repositories/auth.repository';
import JWT from 'jsonwebtoken';


export class AuthController {
  public path = '/auth';
  public router = express.Router();
  private httpStatusCode = HttpStatusCode;

// iss: domínio da aplicação geradora do token;
// sub: é o assunto do token, muito utilizado pra guardar o ID de usuário;
// aud: é o domínio que irá validar o token, definindo quem pode usá-lo;
// exp: é o tempo de expiração do token, em segundos;
// nbf: é o tempo de início da validade do token, em segundos;
// iat: é o tempo de criação do token, em segundos;
// jti: é um identificador único para o token, geralmente utilizado para garantir 
//      que o token não foi alterado;


  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.getToken);
  }

  public getToken = async (req: Request, res: Response, next: NextFunction) => {
   try {
       if (!req.headers.authorization) {
           return res.status(this.httpStatusCode.UNAUTHORIZED).send('Credenciais não informadas!');
       } 
        const [authType, token] = req.headers.authorization.split(' ');
        if (authType !== 'Basic' || !token) {
            return res.status(this.httpStatusCode.UNAUTHORIZED).send('Tipo de autenticação inválido');
        }
        const decodedToken = Buffer.from(token, 'base64').toString('utf-8');
        const [username, password] = decodedToken.split(':');

        if (!username || !password) {
            return res.status(this.httpStatusCode.UNAUTHORIZED).send('Credenciais inválidas!');
        }

        const user = await AuthRepository.getUserByUsernameAndPassword(username, password);
       
        if (user) {
            const token = JWT.sign({username: user.username}, {
                sub: user.uuid,
                iss: 'api.com',
                aud: 'api.com',
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                iat: Math.floor(Date.now() / 1000),
                jti: user.uuid
            }, 'secret');
            return res.status(this.httpStatusCode.OK).send(`Acesso Concedido! Token: ${token}`);
          } else {
            return res.status(this.httpStatusCode.UNAUTHORIZED).send('Acesso Negado!');
        }
    }
    catch (error) {
       if(error instanceof DatabaseError) {
         res.status(this.httpStatusCode.UNAUTHORIZED).json({
           message: 'Acesso negado!',
           error: error,
         })
       } else {
         res.status(this.httpStatusCode.INTERNAL_SERVER_ERROR).json({
           message: 'Ocorreu um erro interno!', error: error,
         })
       } 
    }
  }
}

export default AuthController;