import Task from "../../models/Tasks/Task.js";

class TaskService {
  async createTask(data) {
    return await Task.create(data);
  }

  async getTasks(query) {
    const { tenantId, projectId } = query;

    const filter = { tenantId, projectId, isDeleted: false };

    const tasks = await Task.find(filter).sort({ created: -1 });
    return { tasks, total: tasks.length };
  }

  async getTaskById(id, tenantId) {
    return await Task.findOne({ _id: id, tenantId, isDeleted: false });
  }

  async updateTask(id, tenantId, data) {
    const task = await Task.findOne({ _id: id, tenantId, isDeleted: false });
    if (!task) {
      throw new Error("Task not found");
    }

    Object.assign(task, data);
    return await task.save();
  }

  async deleteTask(id, tenantId) {
    const task = await Task.findOne({ _id: id, tenantId, isDeleted: false });
    if (!task) {
      throw new Error("Task not found");
    }

    task.isDeleted = true;
    return await task.save();
  }
}

export default new TaskService();