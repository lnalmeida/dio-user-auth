import { Router } from 'express';

import  {UserController} from '../controllers/users/user.controller';

const routes = Router();
const userController = new UserController();

//rotas de teste
routes.get("/users/status", userController.testRouteUsers);

//rotas de usuários
routes.get("/users", userController.getAllUsers);

routes.get("/users/:uuid", userController.getUserById);

routes.post("/users", userController.createUser);

routes.put("/users/:uuid", userController.updateUser);

routes.delete("/users/:uuid", userController.deleteUser);

export default routes;