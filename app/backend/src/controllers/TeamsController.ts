import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamsService.getAll();

    res.status(200).json(teams);
  }
}
