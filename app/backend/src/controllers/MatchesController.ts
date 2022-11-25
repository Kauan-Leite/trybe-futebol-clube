import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const matches = await MatchesService.getByProgress(true);

      return res.status(200).json(matches);
    }

    if (inProgress === 'false') {
      const matches = await MatchesService.getByProgress(false);

      return res.status(200).json(matches);
    }

    const matches = await MatchesService.getAll();

    res.status(200).json(matches);
  }

  static async create(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (typeof authorization !== 'string') {
      return res.status(401).json({ message: 'Token invalid' });
    }

    const result = await MatchesService.valid(authorization);

    if (result === null) return res.status(401).json({ message: 'Token invalid' });

    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const matchData = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };

    try {
      const newMatch = await MatchesService.createMatch(matchData);

      res.status(201).json(newMatch);
    } catch (e) { res.status(404).json({ message: 'There is no team with such id!' }); }
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;

    await MatchesService.update(Number(id));

    res.status(200).json({ message: 'Finished' });
  }
}
