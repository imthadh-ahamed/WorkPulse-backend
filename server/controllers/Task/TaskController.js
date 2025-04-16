import TaskService from "../../services/Task/TaskService.js";

export const createTask = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const createdBy = req.user.id;
    const { title, description, assignedTo, priority, status, deadline } =
      req.body;

    const newTask = await TaskService.createTask({
      tenantId,
      title,
      description,
      assignedTo,
      priority,
      status,
      deadline,
      createdBy,
      created: new Date(),
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const { title, status, page = 1, limit = 10 } = req.query;

    const { tasks, total } = await TaskService.getTasks(
      { tenantId, title, status },
      { page: parseInt(page), limit: parseInt(limit) }
    );

    res.status(200).json({
      data: tasks,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
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

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
