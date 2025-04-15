import Project from "../../models/Project/Project.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const createdBy = req.user.id;
    const project = new Project({
      ...req.body,
      tenantId,
      createdBy,
    });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all functions as a single object
export default {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
