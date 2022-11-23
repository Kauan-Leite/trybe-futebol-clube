import { Router } from 'express';
import loginController from '../controllers/login.controller';
import validateInputs from '../middlewares/validateInputs';

const router = Router();

router.post('/login', validateInputs, loginController);

export default router;
