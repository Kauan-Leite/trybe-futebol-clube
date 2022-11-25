import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router = Router();

router.get('/matches', MatchesController.getMatches);

router.post('/matches', MatchesController.create);

router.patch('/matches/:id/finish', MatchesController.finish);

export default router;
