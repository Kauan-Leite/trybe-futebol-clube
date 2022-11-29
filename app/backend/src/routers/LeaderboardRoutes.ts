import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

router.get('/leaderboard/home', LeaderboardController.getLeaderboard);

router.get('/leaderboard/away', LeaderboardController.getLeaderboard);

export default router;
