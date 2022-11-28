import MatchModel from '../database/models/MatchModels';

interface ITeamBaseData {
  name: string;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

interface ITeamCompleteData extends ITeamBaseData {
  totalPoints: number;
  goalsBalance: number;
  efficiency: string;
}

export default class LeaderboardService {
  static async getHomeMatchBasicData(id: number): Promise<ITeamBaseData> {
    const matches = await MatchModel.findAll({
      include: [{ association: 'teamHome', attributes: ['teamName'] }],
      where: { inProgress: false, homeTeam: id } });

    let totalVictories = 0; let totalLosses = 0; let totalDraws = 0;
    let goalsFavor = 0; let goalsOwn = 0;
    const name = matches[0].dataValues.teamHome.teamName; const totalGames = matches.length;

    matches.forEach(({ dataValues }) => {
      goalsFavor += dataValues.homeTeamGoals;
      goalsOwn += dataValues.awayTeamGoals;

      if (dataValues.homeTeamGoals > dataValues.awayTeamGoals) {
        totalVictories += 1;
      } else if (dataValues.homeTeamGoals < dataValues.awayTeamGoals) {
        totalLosses += 1;
      } else { totalDraws += 1; }
    });

    return { name, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn };
  }

  static async getAllHomeData(id:number): Promise<ITeamCompleteData> {
    const team = await this.getHomeMatchBasicData(id);

    const totalPoints = (team.totalVictories * 3) + team.totalDraws;
    const goalsBalance = team.goalsFavor - team.goalsOwn;
    const efficiency = ((totalPoints / (team.totalGames * 3)) * 100).toFixed(2);

    const data = {
      name: team.name,
      totalPoints,
      totalGames: team.totalGames,
      totalVictories: team.totalVictories,
      totalDraws: team.totalDraws,
      totalLosses: team.totalLosses,
      goalsFavor: team.goalsFavor,
      goalsOwn: team.goalsOwn,
      goalsBalance,
      efficiency,
    };

    return data;
  }
}
