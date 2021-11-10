import { Router } from 'express';

import  {UserController} from '../controllers/users/user.controller';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication-middleware';

const routes = Router();
const userController = new UserController();

//rotas de teste
routes.get("/users/status", userController.testRouteUsers);

//rotas de usuários
routes.get("/users", jwtAuthenticationMiddleware, userController.getAllUsers);

routes.get("/users/:uuid", jwtAuthenticationMiddleware, userController.getUserById);

routes.post("/users", jwtAuthenticationMiddleware, userController.createUser);

routes.put("/users/:uuid", jwtAuthenticationMiddleware, userController.updateUser);

routes.delete("/users/:uuid", jwtAuthenticationMiddleware, userController.deleteUser);

export default routes;