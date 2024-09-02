import League from "../models/league.js";
import Team from "../models/team.js";
import Match from "../models/match.js";

// Create a new league
export const createLeague = async (req, res) => {
  const { name, startDate, endDate, teams } = req.body;

  try {
    const newLeague = new League({
      name,
      startDate,
      endDate,
      teams
    });

    const savedLeague = await newLeague.save();
    res.status(201).json(savedLeague);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing league
export const updateLeague = async (req, res) => {
  const { id } = req.params;
  const { name, startDate, endDate, teams } = req.body;

  try {
    const updatedLeague = await League.findByIdAndUpdate(
      id,
      { name, startDate, endDate, teams },
      { new: true, runValidators: true }
    ).populate('teams');

    if (!updatedLeague) {
      return res.status(404).json({ message: "League not found" });
    }

    res.status(200).json(updatedLeague);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a league
export const deleteLeague = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLeague = await League.findByIdAndDelete(id);

    if (!deletedLeague) {
      return res.status(404).json({ message: "League not found" });
    }

    res.status(200).json({ message: "League deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leagues
export const getLeagues = async (req, res) => {
  try {
    const leagues = await League.find().populate('teams');
    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single league by ID
export const getLeagueById = async (req, res) => {
  try {
    const league = await League.findById(req.params.id).populate('teams');
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }
    res.status(200).json(league);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get league table
export const getLeagueTable = async (req, res) => {
  const { id } = req.params;

  try {
    const league = await League.findById(id).populate('teams');
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    const leagueTable = await Promise.all(league.teams.map(async (teamId) => {
      const team = await Team.findById(teamId);
      const leagueStats = team.leagueStats.find(stats => stats.leagueId.toString() === id);
      
      return {
        teamId: team._id,
        teamName: team.name,
        matchesPlayed: leagueStats.matchesPlayed,
        matchesWon: leagueStats.matchesWon,
        matchesDrawn: leagueStats.matchesDrawn,
        matchesLost: leagueStats.matchesLost,
        goalsFor: leagueStats.goalsFor,
        goalsAgainst: leagueStats.goalsAgainst,
        goalDifference: leagueStats.goalDifference,
        points: leagueStats.points
      };
    }));

    // Sort the table by points (descending) and goal difference (descending)
    leagueTable.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.goalDifference - a.goalDifference;
    });

    res.status(200).json(leagueTable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate league calendar
export const generateLeagueCalendar = async (req, res) => {
  const { id } = req.params;

  try {
    const league = await League.findById(id).populate('teams');
    if (!league) {
      return res.status(404).json({ message: "League not found" });
    }

    const teams = league.teams;
    const numTeams = teams.length;

    if (numTeams < 2) {
      return res.status(400).json({ message: "Not enough teams to generate a calendar" });
    }

    const rounds = numTeams - 1;
    const matchesPerRound = numTeams / 2;

    let calendar = [];

    for (let round = 0; round < rounds; round++) {
      let roundMatches = [];

      for (let match = 0; match < matchesPerRound; match++) {
        const home = (round + match) % (numTeams - 1);
        const away = (numTeams - 1 - match + round) % (numTeams - 1);

        // Last team stays in the same position while others rotate
        roundMatches.push({
          home: teams[home === 0 ? 0 : home],
          away: teams[away === 0 ? numTeams - 1 : away],
        });
      }

      calendar.push(roundMatches);
    }

    // Generate return matches
    const returnCalendar = calendar.map(round =>
      round.map(match => ({ home: match.away, away: match.home }))
    );

    calendar = calendar.concat(returnCalendar);

    // Save matches to the database
    const startDate = new Date(league.startDate);
    const savedMatches = await Promise.all(calendar.flat().map(async (match, index) => {
      const matchDate = new Date(startDate);
      matchDate.setDate(matchDate.getDate() + Math.floor(index / matchesPerRound) * 7);

      const newMatch = new Match({
        local: match.home._id,
        visit: match.away._id,
        date: matchDate,
        league: league._id,
        type: 'regular'
      });

      return await newMatch.save();
    }));

    res.status(200).json({ message: "Calendar generated successfully", matches: savedMatches });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
