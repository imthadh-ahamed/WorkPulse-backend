import AnnouncementService from "../../services/Announcement/AnnouncementService.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { tenantId } = req.user;
    const createdBy = req.user.id;

    const newAnnouncement = await AnnouncementService.createAnnouncement({
      title,
      description,
      tenantId,
      created: new Date(),
      createdBy,
    });

    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const { title, page = 1, limit = 4 } = req.query;

    const { announcements, total } = await AnnouncementService.getAnnouncements(
      { tenantId, title },
      { page: parseInt(page), limit: parseInt(limit) }
    );

    res.status(200).json({
      data: announcements,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLatestAnnouncements = async (req, res) => {
  try {
    const { tenantId } = req.user;

    const latestAnnouncements =
      await AnnouncementService.getLatestAnnouncements(tenantId);

    res.status(200).json(latestAnnouncements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    const modifiedBy = req.user.id;

    const updatedAnnouncement = await AnnouncementService.updateAnnouncement(
      id,
      tenantId,
      { ...req.body, modified: new Date(), modifiedBy }
    );

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    await AnnouncementService.deleteAnnouncement(id, tenantId);

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
