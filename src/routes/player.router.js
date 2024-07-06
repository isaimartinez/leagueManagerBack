import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer } from '../controllers/player.controller.js';
const router = express.Router();

// Public routes
router.get('/players', getPlayers);
router.get('/players/:id', getPlayerById);

// Protected routes
router.post('/players', isAuthenticated, isAdmin, createPlayer);
router.put('/players/:id', isAuthenticated, isAdmin, updatePlayer);
router.delete('/players/:id', isAuthenticated, isAdmin, deletePlayer);

export default router;
