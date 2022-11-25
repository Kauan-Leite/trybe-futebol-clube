// import TeamModel from '../database/models/TeamModel';
import { decode, JwtPayload } from 'jsonwebtoken';
import MatchModel from '../database/models/MatchModels';

interface IMatchData {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

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

  static async createMatch(matchData: IMatchData): Promise<object> {
    const newMatch = await MatchModel.create({
      homeTeam: matchData.homeTeam,
      awayTeam: matchData.awayTeam,
      homeTeamGoals: matchData.homeTeamGoals,
      awayTeamGoals: matchData.awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  }

  static async valid(authorization: string): Promise<string | null | JwtPayload> {
    const validToken = decode(authorization);

    return validToken;
  }

  static async update(id: number): Promise<void> {
    await MatchModel.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}
