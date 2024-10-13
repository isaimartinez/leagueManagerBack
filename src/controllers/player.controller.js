import Player from '../models/player.js';

// Get all players
export const getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate('team');
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single player by ID
export const getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findById(id).populate('team');
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new player
export const createPlayer = async (req, res) => {
  const { name, team, goals, yellowCards, redCards, matchesPlayed, picture } = req.body;

  try {
    const newPlayer = new Player({
      name,
      team,
      goals,
      yellowCards,
      redCards,
      matchesPlayed,
      picture
    });

    const savedPlayer = await newPlayer.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing player
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { name, team, goals, yellowCards, redCards, matchesPlayed, picture } = req.body;

  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { name, team, goals, yellowCards, redCards, matchesPlayed, picture },
      { new: true, runValidators: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json(updatedPlayer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a player
export const deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPlayer = await Player.findByIdAndDelete(id);

    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
