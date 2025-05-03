import FocusMode from "../../models/FocusMode/FocusSession.js";

class FocusModeService {
  async createFocusMode(data) {
    return await FocusMode.create(data);
  }

  async getFocusModes(tenantId, { page = 1, limit = 10, title = "" }) {
    const query = {
      tenantId,
      isDeleted: false,
      ...(title && { title: { $regex: title, $options: "i" } }),
    };
    return await FocusMode.find(query)
      .sort({ created: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
  }

  async getFocusModeById(id, tenantId) {
    return await FocusMode.findOne({ _id: id, tenantId, isDeleted: false });
  }

  async updateFocusMode(id, tenantId, data) {
    const focusMode = await FocusMode.findOne({
      _id: id,
      tenantId,
      isDeleted: false,
    });
    if (!focusMode) {
      throw new Error("Focus mode session not found");
    }
    Object.assign(focusMode, data);
    return await focusMode.save();
  }

  async deleteFocusMode(id, tenantId) {
    const focusMode = await FocusMode.findOne({
      _id: id,
      tenantId,
      isDeleted: false,
    });
    if (!focusMode) {
      throw new Error("Focus mode session not found");
    }
    focusMode.isDeleted = true;
    return await focusMode.save();
  }
}

export default new FocusModeService();
