import Project from "../../models/Project/Project.js";

class ProjectService {
  async createProject(data) {
    const project = new Project(data);
    return await project.save();
  }

  async getAllProjects(query, pagination) {
    const { tenantId, name } = query;
    const { page, limit } = pagination;

    const filter = { tenantId, isActive: true };
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    const skip = (page - 1) * limit;
    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ created: -1 });

    return { projects, total };
  }

  async getProjectById(id) {
    return await Project.findById(id);
  }

  async updateProject(id, data) {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProject(id) {
    return await Project.findByIdAndDelete(id);
  }
}

export default new ProjectService();