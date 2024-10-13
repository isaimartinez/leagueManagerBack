import Match from "../models/match.js";

// Get all matches
export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("local")
      .populate("visit")
      .populate("league")
      .populate("visitGoals.player")
      .populate("visitGoals.team")
      .populate("localGoals.player")
      .populate("localGoals.team");
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single match by ID
export const getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Match.findById(id)
      .populate("local")
      .populate("visit")
      .populate("league")
      .populate("visitGoals.player")
      .populate("visitGoals.team")
      .populate("localGoals.player")
      .populate("localGoals.team");
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new match
export const createMatch = async (req, res) => {
  const { home, away, date, type, league } = req.body;

  try {
    const newMatch = new Match({
      local: home.value,
      visit: away.value,
      date,
      type,
      league,
      address: 'TBD', // We'll set a default value for now
    });

    const savedMatch = await newMatch.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing match
export const updateMatch = async (req, res) => {
  const { id } = req.params;
  const { local, visit, date, address, league, visitGoals, localGoals, type } =
    req.body;

  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      id,
      { local, visit, date, address, league, visitGoals, localGoals, type },
      { new: true, runValidators: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a match
export const deleteMatch = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMatch = await Match.findByIdAndDelete(id);

    if (!deletedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create multiple matches
export const createMatches = async (req, res) => {
  const matches = req.body;

  try {
    const savedMatches = await Match.insertMany(matches);
    res.status(201).json(savedMatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
