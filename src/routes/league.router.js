import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth'
import { createLeague, updateLeague, deleteLeague, getLeagues } from '../controllers/league.controller';
const router = express.Router();

router.get('/leagues', getLeagues);

// =========== AUTH =============
router.post('/leagues', isAuthenticated, isAdmin, createLeague);
router.put('/leagues/:id', isAuthenticated, isAdmin, updateLeague);
router.delete('/leagues/:id', isAuthenticated, isAdmin, deleteLeague);

export default router