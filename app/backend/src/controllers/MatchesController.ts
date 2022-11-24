import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
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
}
