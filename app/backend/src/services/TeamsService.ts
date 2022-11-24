import TeamModel from '../database/models/TeamModel';

export default class TeamsService {
  static async getAll(): Promise<object> {
    const teams = await TeamModel.findAll();

    return teams;
  }

  static async getById(id: number): Promise<object | boolean> {
    const team = await TeamModel.findByPk(id);

    if (team === null) {
      return false;
    }

    return team;
  }
}
