import League from "../models/league.js";

// Create a new league
export const createLeague = async (req, res) => {
  const { name, startDate, endDate } = req.body;

  try {
    const newLeague = new League({
      name,
      startDate,
      endDate,
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
  const { name, startDate, endDate } = req.body;

  try {
    const updatedLeague = await League.findByIdAndUpdate(
      id,
      { name, startDate, endDate },
      { new: true, runValidators: true }
    );

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

export const getLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
