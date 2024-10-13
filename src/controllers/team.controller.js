import Team from '../models/team.js';
import League from '../models/league.js';
import Player from '../models/player.js';
import Match from '../models/match.js';

// Get all teams
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate('activeLeagueId');
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single team by ID
export const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findById(id).populate('activeLeagueId');
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new team
export const createTeam = async (req, res) => {
  const { name, activeLeagueId, logo, location } = req.body;

  try {
    let leagueStats = [];
    if (activeLeagueId) {
      const league = await League.findById(activeLeagueId);
      if (!league) {
        return res.status(404).json({ message: 'League not found' });
      }
      leagueStats = [{ leagueId: activeLeagueId }];
    }

    const newTeam = new Team({
      name,
      activeLeagueId,
      logo,
      location,
      leagueStats
    });

    const savedTeam = await newTeam.save();
    
    if (activeLeagueId) {
      // Add the team to the league
      await League.findByIdAndUpdate(activeLeagueId, { $push: { teams: savedTeam._id } });
    }

    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing team
export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, activeLeagueId, logo, foundationYear, stadium } = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { name, activeLeagueId, logo, foundationYear, stadium },
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a team
export const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeam = await Team.findByIdAndDelete(id);

    await League.updateMany(
      { teams: id },
      { $pull: { teams: id } }
    );

    // Remove the team from all players
    await Player.updateMany(
      { team: id },
      { $unset: { team: 1 } }
    );

    // Delete all matches involving this team
    await Match.deleteMany({
      $or: [{ local: id }, { visit: id }]
    });

    res.status(200).json({ message: 'Team deleted successfully', deletedTeam });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ message: error.message });
  }
};
