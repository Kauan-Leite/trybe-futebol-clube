import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamsService.getAll();

    res.status(200).json(teams);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;

    const team = await TeamsService.getById(Number(id));

    if (team !== false) {
      return res.status(200).json(team);
    }

    res.status(404).json({ message: 'team not found' });
  }
}
