import TaskService from "../../services/Task/TaskService.js";

export const createTask = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const createdBy = req.user.id;
    const taskData = { ...req.body, tenantId, createdBy };

    const newTask = await TaskService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const { projectId } = req.query;

    const { tasks } = await TaskService.getTasks({ tenantId, projectId });

    res.status(200).json({
      data: tasks,
      totalItems: tasks.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const task = await TaskService.getTaskById(id, tenantId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    const modifiedBy = req.user.id;

    const updatedTask = await TaskService.updateTask(id, tenantId, {
      ...req.body,
      modified: new Date(),
      modifiedBy,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    await TaskService.deleteTask(id, tenantId);

    res.status(201).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};