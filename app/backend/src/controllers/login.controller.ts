import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = { email, password };

  const result = await loginService(user);

  if (result !== false) {
    return res.status(200).json({ token: result });
  }

  res.status(401).json({ message: 'Incorrect email or password' });
};

export default login;
