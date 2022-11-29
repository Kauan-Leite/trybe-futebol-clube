import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    const { path } = req;
    const teamsData = [];

    for (let index = 1; index <= 16; index += 1) {
      if (path.includes('home')) {
        teamsData.push(LeaderboardService.getHomeData(index));
      } else if (path.includes('away')) {
        teamsData.push(LeaderboardService.getAwayData(index));
      }
    }

    const leaderboard = (await Promise.all(teamsData)).sort(
      (a, b) =>
        b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor,
    );

    res.status(200).json(leaderboard);
  }
}
