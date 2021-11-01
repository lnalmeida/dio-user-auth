import { Router } from 'express';

import  {UserController} from '../controllers/users/user.controller';

const routes = Router();
const userController = new UserController();

routes.get("/users/status", userController.testRouteUsers);

routes.get("/users", userController.getAllUsers);

routes.get("/users/:id", userController.getUserById);

routes.post("/users", userController.createUser);

routes.put("/users/:id", userController.updateUser);

routes.delete("/users/:id", userController.deleteUser);

export default routes;