import express, { Request, Response, NextFunction } from 'express';

import HttpStatusCode from '../../consts/HttpStatusCode';
import DatabaseError from '../../errors/database.error';
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
    this.router.post(`${this.path}/validate`, this.validateToken);
  }

  public getToken = async (req: Request, res: Response, next: NextFunction) => {
   try {
     const user = req.user

     if (!user) throw new Error('Usuário não informado!!');

      const jwtPayload = {username: user.username};
      const jwtOptions = {
        subject: user.uuid,
        issuer: 'http://localhost:3000',
        audience: 'http://localhost:3000',
        expiresIn: '1h',
      };
      const jwtSecretKey = process.env.JWT_SECRET_KEY || 'mySecret';
      const jwtToken = JWT.sign(jwtPayload, jwtSecretKey, jwtOptions);
      return res.status(this.httpStatusCode.OK).send(`Acesso Concedido! Token: ${jwtToken}`);
        
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

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    res.status(this.httpStatusCode.OK).send('Token validado com sucesso!');
  }
}

export default AuthController;