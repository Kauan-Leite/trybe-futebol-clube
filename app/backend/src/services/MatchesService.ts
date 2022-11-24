// import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModels';

export default class MatchesService {
  static async getAll(): Promise<object> {
    const matches = await MatchModel.findAll({
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async getByProgress(inProgress: boolean): Promise<object> {
    const matches = await MatchModel.findAll({
      where: { inProgress },
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}
