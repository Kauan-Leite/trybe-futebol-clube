import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import { compareSync } from 'bcryptjs';

import UserModel from '../database/models/UserModel';

config();

const secret = process.env.JWT_SECRET || 'secret';

export default class LoginService {
  static async getAll(email: string, password: string): Promise<string | boolean> {
    const user = await UserModel.findOne({ where: { email } });

    if (user !== null && compareSync(password, user.password)) {
      const token = sign({ id: user.id, role: user.role }, secret);
      return token;
    }

    return false;
  }
}
