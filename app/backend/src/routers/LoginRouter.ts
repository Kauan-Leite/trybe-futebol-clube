import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateInputs from '../middlewares/validateInputs';

const router = Router();

router.post('/login', validateInputs, LoginController.login);

router.get('/login/validate', LoginController.validate);

export default router;
