import Announcement from "../../models/Announcement/Announcement.js";

export const createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { tenantId } = req.user;
    const createdBy = req.user.id;

    const newAnnouncement = await Announcement.create({
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

    const query = { tenantId };

    // Optional title search (case-insensitive)
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count for pagination metadata
    const total = await Announcement.countDocuments(query);

    const announcements = await Announcement.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: 1 });

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

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const { tenantId } = req.user;
    const modifiedBy = req.user.id;

    const announcement = await Announcement.findOne({ _id: id, tenantId });

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    announcement.title = title;
    announcement.description = description;
    announcement.modified = new Date();
    announcement.modifiedBy = modifiedBy;

    await announcement.save();

    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const announcement = await Announcement.findOne({ _id: id, tenantId });

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    await announcement.deleteOne({ _id: id, tenantId });

    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLatestAnnouncements = async (req, res) => {
  try {
    const { tenantId } = req.user;

    // Fetch the latest 2 announcements for the tenant, sorted by created date in descending order
    const latestAnnouncements = await Announcement.find({ tenantId })
      .sort({ created: -1 }) // Sort by created date in descending order
      .limit(2); // Limit the results to 2

    res.status(200).json(latestAnnouncements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
