import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { getPlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer } from '../controllers/player.controller.js';

const router = express.Router();

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/players', getPlayers);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get a player by ID
 *     tags: [Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Player not found
 *       500:
 *         description: Server error
 */
router.get('/players/:id', getPlayerById);

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - team
 *             properties:
 *               name:
 *                 type: string
 *               team:
 *                 type: string
 *               goals:
 *                 type: number
 *               yellowCards:
 *                 type: number
 *               redCards:
 *                 type: number
 *               matchesPlayed:
 *                 type: number
 *               picture:
 *                 type: string
 *     responses:
 *       201:
 *         description: Player created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/players', isAuthenticated, isAdmin, createPlayer);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Update a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               team:
 *                 type: string
 *               goals:
 *                 type: number
 *               yellowCards:
 *                 type: number
 *               redCards:
 *                 type: number
 *               matchesPlayed:
 *                 type: number
 *               picture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Player not found
 *       500:
 *         description: Server error
 */
router.put('/players/:id', isAuthenticated, isAdmin, updatePlayer);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Player not found
 *       500:
 *         description: Server error
 */
router.delete('/players/:id', isAuthenticated, isAdmin, deletePlayer);

export default router;
