import FocusModeService from "../../services/FocusMode/focusModeService.js";

// Create a new focus mode session
export const createFocusMode = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const createdBy = req.user.id;
    const created = new Date();
    const focusModeData = { ...req.body, tenantId, created, createdBy };
    const newFocusMode = await FocusModeService.createFocusMode(focusModeData);
    res.status(201).json(newFocusMode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all focus mode sessions
export const getFocusModes = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const { page, limit, title } = req.query;
    const focusModes = await FocusModeService.getFocusModes(tenantId, {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      title: title || "",
    });
    res.status(200).json(focusModes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a focus mode session by ID
export const getFocusModeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    const focusMode = await FocusModeService.getFocusModeById(id, tenantId);
    if (!focusMode) {
      return res.status(404).json({ error: "Focus mode session not found" });
    }
    res.status(200).json(focusMode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a focus mode session
export const updateFocusMode = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    const modifiedBy = req.user.id;
    const updatedFocusMode = await FocusModeService.updateFocusMode(
      id,
      tenantId,
      {
        ...req.body,
        modified: new Date(),
        modifiedBy,
      }
    );
    res.status(200).json(updatedFocusMode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a focus mode session
export const deleteFocusMode = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    await FocusModeService.deleteFocusMode(id, tenantId);
    res
      .status(204)
      .json({ message: "Focus mode session deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
