import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { getGroups, getGroupById, createGroup, updateGroup, deleteGroup } from '../controllers/group.controller.js';

const router = express.Router();

// Public routes
router.get('/groups', getGroups);
router.get('/groups/:id', getGroupById);

// Protected routes
router.post('/groups', isAuthenticated, isAdmin, createGroup);
router.put('/groups/:id', isAuthenticated, isAdmin, updateGroup);
router.delete('/groups/:id', isAuthenticated, isAdmin, deleteGroup);

export default router;
