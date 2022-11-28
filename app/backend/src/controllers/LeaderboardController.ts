import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboardHome(req: Request, res: Response) {
    const teamsData = [];

    for (let index = 1; index <= 16; index += 1) {
      teamsData.push(LeaderboardService.getAllHomeData(index));
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
