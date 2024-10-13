import express from 'express';
import Team from '../models/team.js';
import League from '../models/league.js';
import Match from '../models/match.js';
import Player from '../models/player.js';

const router = express.Router();

router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find().select('name').limit(10);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/leagues', async (req, res) => {
  try {
    const leagues = await League.find().select('name').limit(5);
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/matches', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const matches = await Match.find()
      .populate('homeTeam', 'name')
      .populate('awayTeam', 'name')
      .select('homeTeam awayTeam date')
      .sort({ date: -1 })
      .limit(limit);
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const teamCount = await Team.countDocuments();
    const leagueCount = await League.countDocuments();
    const matchCount = await Match.countDocuments();
    res.json({ teamCount, leagueCount, matchCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/leagues/current/table', async (req, res) => {
  try {
    const currentLeague = await League.findOne({ isCurrent: true });
    if (!currentLeague) {
      return res.status(404).json({ message: 'No current league found' });
    }

    const teams = await Team.find({ activeLeagueId: currentLeague._id })
      .sort({ points: -1, goalDifference: -1 })
      .lean();

    const leagueTable = teams.map((team, index) => ({
      position: index + 1,
      team: team.name,
      played: team.leagueStats[0].matchesPlayed,
      won: team.leagueStats[0].matchesWon,
      drawn: team.leagueStats[0].matchesDrawn,
      lost: team.leagueStats[0].matchesLost,
      goalsFor: team.leagueStats[0].goalsFor,
      goalsAgainst: team.leagueStats[0].goalsAgainst,
      goalDifference: team.leagueStats[0].goalDifference,
      points: team.leagueStats[0].points,
    }));

    res.json(leagueTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/leagues/current/best-of-season', async (req, res) => {
  try {
    const currentLeague = await League.findOne({ isCurrent: true });
    if (!currentLeague) {
      return res.status(404).json({ message: 'No current league found' });
    }

    const topScorer = await Player.findOne({ activeLeagueId: currentLeague._id })
      .sort({ 'leagueStats.goals': -1 })
      .select('name leagueStats.goals')
      .lean();

    const teamMostGoals = await Team.findOne({ activeLeagueId: currentLeague._id })
      .sort({ 'leagueStats.goalsFor': -1 })
      .select('name leagueStats.goalsFor')
      .lean();

    const bestDefense = await Team.findOne({ activeLeagueId: currentLeague._id })
      .sort({ 'leagueStats.goalsAgainst': 1 })
      .select('name leagueStats.goalsAgainst')
      .lean();

    const fairPlayAward = await Team.findOne({ activeLeagueId: currentLeague._id })
      .sort({ 'leagueStats.yellowCards': 1, 'leagueStats.redCards': 1 })
      .select('name leagueStats.yellowCards leagueStats.redCards')
      .lean();

    res.json({
      topScorer: {
        name: topScorer?.name,
        goals: topScorer?.leagueStats[0]?.goals || 0,
      },
      teamMostGoals: {
        name: teamMostGoals?.name,
        goals: teamMostGoals?.leagueStats[0]?.goalsFor || 0,
      },
      bestDefense: {
        name: bestDefense?.name,
        goalsAgainst: bestDefense?.leagueStats[0]?.goalsAgainst || 0,
      },
      fairPlayAward: {
        name: fairPlayAward?.name,
        cards: (fairPlayAward?.leagueStats[0]?.yellowCards || 0) + (fairPlayAward?.leagueStats[0]?.redCards || 0),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;