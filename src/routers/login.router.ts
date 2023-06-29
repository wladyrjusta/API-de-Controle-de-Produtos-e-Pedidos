import { Router } from 'express';

import loginController from '../controllers/login.controller';

const loginRouter = Router();
const path = '/login';

loginRouter.post(path, loginController.login);

export default loginRouter;
