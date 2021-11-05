import express, { Request, Response, NextFunction } from 'express';

import HttpStatusCode from '../../consts/HttpStatusCode';
import UserRepository from '../../database/repositories/user.repository';

export class UserController {
  public path = '/users';
  public router = express.Router();
  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.post(this.path, this.createUser);
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  public testRouteUsers = (req: Request, res: Response, next: NextFunction) =>
  {
      res.status(this.httpStatusCode.OK).send('Route "/users" working OK!');  
  }

  public getAllUsers = async (req: Request, res: Response, next: NextFunction) =>
  {
      const users = await UserRepository.getAllUsers();
      res.status(this.httpStatusCode.OK).send(users);  
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => 
  {
      const userId = req.params.uuid;
      const user = await UserRepository.getUserById(userId);
      if (!user) {
        res.status(this.httpStatusCode.NOT_FOUND).send(`User with id ${userId} not found`);
      } else {
      res.status(this.httpStatusCode.OK).send(user);   
      }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => 
  {
      const user = req.body;
      await UserRepository.createUser(user);
      res.status(this.httpStatusCode.CREATED).send('User created with success!!');
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => 
  {
      const updatedUser = req.body
      updatedUser.uuid = req.params.uuid;
      await UserRepository.updateUser(updatedUser);
      return res.status(this.httpStatusCode.OK).send('User updated with success!!');
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => 
  {
      const uuid = req.params.uuid;
      await UserRepository.deleteUser(uuid);
      res.status(this.httpStatusCode.OK).send(`User removed with success!!!!`);
  }
}