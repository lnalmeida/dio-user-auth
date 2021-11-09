import {Router} from 'express'
import { AuthController } from '../controllers/auth/auth.controller';


const authRoute = Router();
const authController = new AuthController();

authRoute.post('/auth/token', authController.getToken);


export default authRoute;

