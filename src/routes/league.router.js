import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js'
import { 
  createLeague, 
  updateLeague, 
  deleteLeague, 
  getLeagues, 
  getLeagueById, 
  getLeagueTable,
  generateLeagueCalendar
} from '../controllers/league.controller.js';

const router = express.Router();

/**
 * @swagger
 * /leagues:
 *   get:
 *     summary: Get all leagues
 *     tags: [Leagues]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Server error
 */
router.get('/leagues', getLeagues);

/**
 * @swagger
 * /leagues/{id}:
 *   get:
 *     summary: Get a league by ID
 *     tags: [Leagues]
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
 *         description: League not found
 *       500:
 *         description: Server error
 */
router.get('/leagues/:id', getLeagueById);

/**
 * @swagger
 * /leagues/{id}/table:
 *   get:
 *     summary: Get league table
 *     tags: [Leagues]
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
 *         description: League not found
 *       500:
 *         description: Server error
 */
router.get('/leagues/:id/table', getLeagueTable);

/**
 * @swagger
 * /leagues:
 *   post:
 *     summary: Create a new league
 *     tags: [Leagues]
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
 *               - startDate
 *               - endDate
 *             properties:
 *               name:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               teams:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: League created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/leagues', isAuthenticated, isAdmin, createLeague);

/**
 * @swagger
 * /leagues/{id}:
 *   put:
 *     summary: Update a league
 *     tags: [Leagues]
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
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               teams:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: League updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: League not found
 *       500:
 *         description: Server error
 */
router.put('/leagues/:id', isAuthenticated, isAdmin, updateLeague);

/**
 * @swagger
 * /leagues/{id}:
 *   delete:
 *     summary: Delete a league
 *     tags: [Leagues]
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
 *         description: League deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: League not found
 *       500:
 *         description: Server error
 */
router.delete('/leagues/:id', isAuthenticated, isAdmin, deleteLeague);

/**
 * @swagger
 * /leagues/{id}/generate-calendar:
 *   post:
 *     summary: Generate a calendar for the league
 *     tags: [Leagues]
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
 *         description: Calendar generated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: League not found
 *       500:
 *         description: Server error
 */
router.post('/leagues/:id/generate-calendar', isAuthenticated, isAdmin, generateLeagueCalendar);

export default router;