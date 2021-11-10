import {Router} from 'express'
import { AuthController } from '../controllers/auth/auth.controller';
import basicAuthenticationMiddleware from '../middlewares/basic-authentication-middleware';
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication-middleware';


const authRoute = Router();
const authController = new AuthController();

authRoute.post('/auth/validate', jwtAuthenticationMiddleware, authController.validateToken);
authRoute.post('/auth/token', basicAuthenticationMiddleware, authController.getToken);


export default authRoute;

