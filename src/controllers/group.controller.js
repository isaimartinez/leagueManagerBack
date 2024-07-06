import Group from '../models/group.js';

// Get all groups
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('league').populate('teams');
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single group by ID
export const getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await Group.findById(id).populate('league').populate('teams');
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new group
export const createGroup = async (req, res) => {
  const { name, league, teams } = req.body;

  try {
    const newGroup = new Group({
      name,
      league,
      teams
    });

    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing group
export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, league, teams } = req.body;

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { name, league, teams },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a group
export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGroup = await Group.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
