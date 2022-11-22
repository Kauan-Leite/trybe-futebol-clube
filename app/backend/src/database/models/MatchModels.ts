import { DataTypes, Model } from 'sequelize';
import db from '.';
import TeamModel from './TeamModel';
// import TeamModel from './TeamModel';
// import OtherModel from './OtherModel';

class MatchModel extends Model {
  // declare <campo>: <tipo>;
  id?: number;
  homeTeam?: number;
  homeTeamGoals?: number;
  awayTeam?: number;
  awayTeamGoals?: number;
  inProgress?: boolean;
}

MatchModel.init({
  // ... Campos
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.NUMBER,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
  },
  awayTeam: {
    type: DataTypes.NUMBER,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchModel.belongsTo(TeamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(TeamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

export default MatchModel;
