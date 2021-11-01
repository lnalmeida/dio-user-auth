import express, { Request, Response, NextFunction } from 'express';

import HttpStatusCode from '../../consts/HttpStatusCode';

const usersMock = [

  {
    'id': 1,
    'name': 'Leanne Graham',
    'username': 'Bret',
    'email': 'bret@email.com',
    'avatar': 'https://unsplash.com/photos/d2MSDujJl2g',
  },
  {
    'id': 2,
    'name': 'Ervin Howell',
    'username': 'Antonette',
    'email': 'antonnete@email.com',
    'avatar': 'https://unsplash.com/photos/d-MfHM-jHwc',
  },
  {
    'id': 3,
    'name': 'Clementine Bauch',
    'username': 'Samantha',
    'email': 'samantha@email.com',
      'avatar': 'https://unsplash.com/photos/Id6U55AZMpg',
  },
  {
    'id': 4,
    'name': 'Patricia Lebsack',
    'username': 'Karianne',
    'email': 'kariane@email.com',
      'avatar': 'https://unsplash.com/photos/15Vb4B_ma_s',
  },
  {
    'id': 5,
    'name': 'Chelsey Dietrich',
    'username': 'Kamren',
    'email': 'kamren@email.com,',
    'avatar': 'https://unsplash.com/photos/IF9TK5Uy-KI',
  },
  {
    'id': 6,
    'name': 'Mrs. Dennis Schulist',
    'username': 'Leopoldo_Corkery',
    'email': 'corkery@email.com',
    'avatar': 'https://unsplash.com/photos/JyVcAIUAcPM',
  },
  {
    'id': 7,
    'name': 'Kurtis Weissnat',
    'username': 'Elwyn.Skiles',
    'email': 'skiles@email.com',
    'avatar': 'https://unsplash.com/photos/763-mBawsfg',
  },
  {
    'id': 8,
    'name': 'Nicholas Runolfsdottir V',
    'username': 'Maxime_Nienow',
    'email': 'nienow@email.com',
    'avatar': 'https://unsplash.com/photos/8PMvB4VyVXA', 
  },
  {
    'id': 9,
    'name': 'Glenna Reichert',
    'username': 'Delphine',
    'email': 'delphine@email.com',
    'avatar': 'https://unsplash.com/photos/pH8bJytQMZc',
  },
  {
    'id': 10,
    'name': 'Clementina DuBuque',
    'username': 'Moriah.Stanton',
    'email': 'stanton@email.com',
    'avatar': 'https://unsplash.com/photos/aU_eOcelLhQ',
  }
];

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
    res.send('Route "/users" working OK!');
  }


  public getAllUsers = (req: Request, res: Response, next: NextFunction) =>
  {
    const users = usersMock;
    res.status(this.httpStatusCode.OK).send(users);
  }

  public getUserById = (req: Request, res: Response, next: NextFunction) => 
  {
    const userId = parseInt(req.params.id);
    const user = usersMock.find(user => user.id === userId);
    if (!user) {
      res.status(this.httpStatusCode.NOT_FOUND).send(`User with id ${userId} not found`);
    } 
    res.status(this.httpStatusCode.OK).send(user);
  }

  public createUser = (req: Request, res: Response, next: NextFunction) => 
  {
    const user = req.body;
    console.log(user);
    user.id = usersMock.length + 1;
    usersMock.push(user);
    res.send(user);
  }

  public updateUser = (req: Request, res: Response, next: NextFunction) => 
  {
    const userId = parseInt(req.params.id);
    const user = usersMock.find(user => user.id === userId);
    if (!user) {
      res.status(this.httpStatusCode.NOT_FOUND).send(`User with id ${userId} not found`);
    };
    const updatedUser = req.body;
    user.name = updatedUser.name;
    user.username = updatedUser.username;
    user.email = updatedUser.email;
    user.avatar = updatedUser.avatar;
    res.send(user);
  }

  public deleteUser = (req: Request, res: Response, next: NextFunction) => 
  {
    const userId = parseInt(req.params.id);
    const user = usersMock.find(user => user.id === userId);
    if (!user) {
      res.status(this.httpStatusCode.NOT_FOUND).send(`User with id ${userId} not found`);
    };
    const index = usersMock.indexOf(user);
    usersMock.splice(index, 1);
    res.send(`Delete user id: ${req.params.id}`);
  }
}