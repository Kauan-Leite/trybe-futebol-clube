import TeamModel from '../database/models/TeamModel';

export default class TeamsService {
  static async getAll(): Promise<object> {
    const teams = await TeamModel.findAll();

    return teams;
  }
}
