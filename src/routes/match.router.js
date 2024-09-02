import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { getMatches, getMatchById, createMatch, updateMatch, deleteMatch } from '../controllers/match.controller.js';

const router = express.Router();

/**
 * @swagger
 * /matches:
 *   get:
 *     summary: Get all matches
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/matches', getMatches);

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     summary: Get a match by ID
 *     tags: [Matches]
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
 *         description: Match not found
 *       500:
 *         description: Server error
 */
router.get('/matches/:id', getMatchById);

/**
 * @swagger
 * /matches:
 *   post:
 *     summary: Create a new match
 *     tags: [Matches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - local
 *               - visit
 *               - date
 *               - address
 *               - league
 *               - type
 *             properties:
 *               local:
 *                 type: string
 *               visit:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               address:
 *                 type: string
 *               league:
 *                 type: string
 *               visitGoals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     player:
 *                       type: string
 *                     team:
 *                       type: string
 *               localGoals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     player:
 *                       type: string
 *                     team:
 *                       type: string
 *               type:
 *                 type: string
 *                 enum: [regular, eliminatoria]
 *     responses:
 *       201:
 *         description: Match created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/matches', isAuthenticated, isAdmin, createMatch);

/**
 * @swagger
 * /matches/{id}:
 *   put:
 *     summary: Update a match
 *     tags: [Matches]
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
 *               local:
 *                 type: string
 *               visit:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               address:
 *                 type: string
 *               league:
 *                 type: string
 *               visitGoals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     player:
 *                       type: string
 *                     team:
 *                       type: string
 *               localGoals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     player:
 *                       type: string
 *                     team:
 *                       type: string
 *               type:
 *                 type: string
 *                 enum: [regular, eliminatoria]
 *     responses:
 *       200:
 *         description: Match updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Match not found
 *       500:
 *         description: Server error
 */
router.put('/matches/:id', isAuthenticated, isAdmin, updateMatch);

/**
 * @swagger
 * /matches/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags: [Matches]
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
 *         description: Match deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Match not found
 *       500:
 *         description: Server error
 */
router.delete('/matches/:id', isAuthenticated, isAdmin, deleteMatch);

export default router;
