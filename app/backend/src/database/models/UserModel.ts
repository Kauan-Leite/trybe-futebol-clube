import { DataTypes, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class UserModel extends Model {
  // declare <campo>: <tipo>;
  id?: number;
  username?: string;
  role?: string;
  email?: string;
  password?: string;
}

UserModel.init({
  // ... Campos
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default UserModel;
