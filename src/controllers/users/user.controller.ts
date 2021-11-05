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
    try {
      res.status(this.httpStatusCode.OK).send('Route "/users" working OK!');  
    } catch (error) {
        const app_error = new Error(`Error testing Routes: ${error}`);
        res.status(this.httpStatusCode.INTERNAL_SERVER_ERROR).send(app_error);
    }
  }

  private getUserByEmail = async (email:string) => {
    try {
      const userExists = await UserRepository.getUserByEmail(email);
      return userExists ? true : false;
    } catch (error) {
      throw new Error(`Error getting user by email: ${error}`);
    }
  }

  // private getUserByUsername = async (username: string) => {
  //   try {
  //     const userExists = await UserRepository.getUserByUsername(username);
  //     return userExists ? true : false;
  //   } catch (error) {
  //     throw new Error(`Error getting user by username: ${error}`);
  //   }
  // }


  public getAllUsers = async (req: Request, res: Response, next: NextFunction) =>
  {
    try {
      const users = await UserRepository.getAllUsers();
      res.status(this.httpStatusCode.OK).send(users);  
    } catch (error) {
        const app_error =new Error(`Error getting the list of users: ${error}`);
        res.status(this.httpStatusCode.INTERNAL_SERVER_ERROR).send(app_error);
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => 
  {
    try {
      const userId = req.params.uuid;
      console.log(`UserController - getUserById - ${userId}`)
      const user = await UserRepository.getUserById(userId);
      if (!user) {
        res.status(this.httpStatusCode.NOT_FOUND).send(`User with id ${userId} not found`);
      } else {
      res.status(this.httpStatusCode.OK).send(user);   
      }
    } catch (error) {
        const app_error = new Error(`Error while getting user with id ${req.params.id}`);
        res.status(this.httpStatusCode.INTERNAL_SERVER_ERROR).send(app_error);
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => 
  {
    try {
      const user = req.body;
      await UserRepository.createUser(user);
      res.status(this.httpStatusCode.CREATED).send('User created with success!!');
    } catch (error) {
        const app_error =new Error(`Error creating user: ${error}`);
        res.status(this.httpStatusCode.INTERNAL_SERVER_ERROR).send(app_error);      
    }
  }

  public  updateUser = async (req: Request, res: Response, next: NextFunction) => 
  {
    try {
      const user = req.body;
      await UserRepository.updateUser(user);
      console.log('foi pra repositorio')
      return res.status(this.httpStatusCode.OK).send('User updated with success!!');
    } catch (error) {
        const app_error = new Error(`Error updating user id: ${req.params.id}`)
        res.status(this.httpStatusCode.INTERNAL_SERVER_ERROR).send(app_error);      
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => 
  {
    try {
      const uuid = req.params.uuid;
      await UserRepository.deleteUser(uuid);
      res.status(this.httpStatusCode.OK).send(`User removed with success!!!!`);
    } catch (error) {
        const app_error = new Error(`Error deleting user id: ${req.params.id}`);
        res.status(this.httpStatusCode.INTERNAL_SERVER_ERROR).send(app_error);      
    }
  }
}