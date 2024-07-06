import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { getTeams, getTeamById, createTeam, updateTeam, deleteTeam } from '../controllers/team.controller.js';
const router = express.Router();

// Public routes
router.get('/teams', getTeams);
router.get('/teams/:id', getTeamById);

// Protected routes
router.post('/teams', isAuthenticated, isAdmin, createTeam);
router.put('/teams/:id', isAuthenticated, isAdmin, updateTeam);
router.delete('/teams/:id', isAuthenticated, isAdmin, deleteTeam);

export default router;
