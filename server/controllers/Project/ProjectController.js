import ProjectService from "../../services/Project/ProjectService.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const createdBy = req.user.id;
    const projectData = { ...req.body, tenantId, createdBy };

    const savedProject = await ProjectService.createProject(projectData);
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const { page = 1, limit = 10, name } = req.query;
    const query = { tenantId, name };
    const pagination = { page: parseInt(page), limit: parseInt(limit) };
    const projects = await ProjectService.getAllProjects(query, pagination);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await ProjectService.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await ProjectService.updateProject(
      req.params.id,
      req.body
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
    const deletedProject = await ProjectService.deleteProject(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });
    res.status(201).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};