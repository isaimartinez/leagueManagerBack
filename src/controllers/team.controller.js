import Team from "../models/team";

// Get all teams
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("group");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single team by ID
export const getTeamById = async (req, res) => {
  const { id } = req.params;
  try {
    const team = await Team.findById(id).populate("group");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new team
export const createTeam = async (req, res) => {
  const { name, group } = req.body;

  try {
    const newTeam = new Team({ name, group });
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing team
export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { name, group } = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { name, group },
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
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

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
