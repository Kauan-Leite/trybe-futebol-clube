import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await LoginService.getAll(email, password);

    if (result !== false) {
      return res.status(200).json({ token: result });
    }

    res.status(401).json({ message: 'Incorrect email or password' });
  }

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (typeof authorization !== 'string') {
      res.status(401).json({ message: 'Token invalid' });
    } else {
      const result = await LoginService.valid(authorization);

      if (result === null) {
        res.status(401).json({ message: 'Token invalid' });
      }

      res.status(200).json(result);
    }
  }
}
