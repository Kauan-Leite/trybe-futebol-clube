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

  static async getAwayMatchBasicData(id: number): Promise<ITeamBaseData> {
    const matches = await MatchModel.findAll({
      include: [{ association: 'teamAway', attributes: ['teamName'] }],
      where: { inProgress: false, awayTeam: id } });

    let totalVictories = 0; let totalLosses = 0; let totalDraws = 0;
    let goalsFavor = 0; let goalsOwn = 0;
    const name = matches[0].dataValues.teamAway.teamName; const totalGames = matches.length;

    matches.forEach(({ dataValues }) => {
      goalsFavor += dataValues.awayTeamGoals;
      goalsOwn += dataValues.homeTeamGoals;

      if (dataValues.awayTeamGoals > dataValues.homeTeamGoals) {
        totalVictories += 1;
      } else if (dataValues.awayTeamGoals < dataValues.homeTeamGoals) {
        totalLosses += 1;
      } else { totalDraws += 1; }
    });

    return { name, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn };
  }

  static async getHomeData(id: number): Promise<ITeamCompleteData> {
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

  static async getAwayData(id: number): Promise<ITeamCompleteData> {
    const team = await this.getAwayMatchBasicData(id);

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

  static async getAllMatchData(id: number): Promise<ITeamCompleteData> {
    const homeData = await this.getHomeData(id);
    const awayData = await this.getAwayData(id);

    const totalPoints = homeData.totalPoints + awayData.totalPoints;
    const totalGames = homeData.totalGames + awayData.totalGames;
    const goalsFavor = homeData.goalsFavor + awayData.goalsFavor;
    const goalsOwn = homeData.goalsOwn + awayData.goalsOwn;

    return {
      name: homeData.name,
      totalPoints,
      totalGames,
      totalVictories: homeData.totalVictories + awayData.totalVictories,
      totalDraws: homeData.totalDraws + awayData.totalDraws,
      totalLosses: homeData.totalLosses + awayData.totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  }
}
