import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { getMatches, getMatchById, createMatch, updateMatch, deleteMatch } from '../controllers/match.controller.js';

const router = express.Router();

// Public routes
router.get('/matches', getMatches);
router.get('/matches/:id', getMatchById);

// Protected routes
router.post('/matches', isAuthenticated, isAdmin, createMatch);
router.put('/matches/:id', isAuthenticated, isAdmin, updateMatch);
router.delete('/matches/:id', isAuthenticated, isAdmin, deleteMatch);

export default router;
