import {Router} from 'express'
import { AuthController } from '../controllers/auth/auth.controller';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication-middleware';


const authRoute = Router();
const authController = new AuthController();

authRoute.post('/auth/token', basicAuthenticationMiddleware, authController.getToken);


export default authRoute;

