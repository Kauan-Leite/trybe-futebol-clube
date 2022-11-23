import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import * as bcrypt from 'bcryptjs';

import User from '../database/models/UserModel';

interface ILogin {
  email: string,
  password: string,
}

config();

const secret = process.env.JWT_SECRET || 'secret';

const login = async (user: ILogin) => {
  const userData = await User.findAll({
    where: { email: user.email },
  });

  if (userData.length !== 0 && bcrypt.compareSync(user.password, userData[0].password)) {
    const token = sign({ id: userData[0].id, role: userData[0].role }, secret);
    return token;
  }
  return false;
};

export default login;
