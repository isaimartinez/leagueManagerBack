import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js'
import { createLeague, updateLeague, deleteLeague, getLeagues } from '../controllers/league.controller.js';
const router = express.Router();

router.get('/leagues', getLeagues);

// // =========== AUTH =============
router.post('/league', isAuthenticated, isAdmin, createLeague);
router.put('/leagues/:id', isAuthenticated, isAdmin, updateLeague);
router.delete('/leagues/:id', isAuthenticated, isAdmin, deleteLeague);

export default router