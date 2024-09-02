import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { getTeams, getTeamById, createTeam, updateTeam, deleteTeam } from '../controllers/team.controller.js';

const router = express.Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/teams', getTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team by ID
 *     tags: [Teams]
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
 *         description: Team not found
 *       500:
 *         description: Server error
 */
router.get('/teams/:id', getTeamById);

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
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
 *               - activeLeagueId
 *             properties:
 *               name:
 *                 type: string
 *               activeLeagueId:
 *                 type: string
 *               leagueStats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     leagueId:
 *                       type: string
 *                     matchesPlayed:
 *                       type: number
 *                     matchesWon:
 *                       type: number
 *                     matchesDrawn:
 *                       type: number
 *                     matchesLost:
 *                       type: number
 *                     goalsFor:
 *                       type: number
 *                     goalsAgainst:
 *                       type: number
 *     responses:
 *       201:
 *         description: Team created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/teams', isAuthenticated, isAdmin, createTeam);

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team
 *     tags: [Teams]
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
 *               activeLeagueId:
 *                 type: string
 *               leagueStats:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     leagueId:
 *                       type: string
 *                     matchesPlayed:
 *                       type: number
 *                     matchesWon:
 *                       type: number
 *                     matchesDrawn:
 *                       type: number
 *                     matchesLost:
 *                       type: number
 *                     goalsFor:
 *                       type: number
 *                     goalsAgainst:
 *                       type: number
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team not found
 *       500:
 *         description: Server error
 */
router.put('/teams/:id', isAuthenticated, isAdmin, updateTeam);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team
 *     tags: [Teams]
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
 *         description: Team deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Team not found
 *       500:
 *         description: Server error
 */
router.delete('/teams/:id', isAuthenticated, isAdmin, deleteTeam);

export default router;
