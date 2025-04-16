import Task from "../../models/Tasks/Task.js";

class TaskService {
  async createTask(data) {
    return await Task.create(data);
  }

  async getTasks(query, pagination) {
    const { tenantId, title, status } = query;
    const { page, limit } = pagination;

    const filter = { tenantId, isDeleted: false };
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    const total = await Task.countDocuments(filter);
    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ created: -1 });

    return { tasks, total };
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
