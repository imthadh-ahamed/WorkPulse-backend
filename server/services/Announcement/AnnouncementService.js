import Announcement from "../../models/Announcement/Announcement.js";

class AnnouncementService {
  async createAnnouncement(data) {
    return await Announcement.create(data);
  }

  async getAnnouncements(query, pagination) {
    const { tenantId, title } = query;
    const { page, limit } = pagination;

    const filter = { tenantId };
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    const skip = (page - 1) * limit;
    const total = await Announcement.countDocuments(filter);
    const announcements = await Announcement.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 1 });

    return { announcements, total };
  }

  async getLatestAnnouncements(tenantId) {
    return await Announcement.find({ tenantId }).sort({ created: -1 }).limit(2);
  }

  async updateAnnouncement(id, tenantId, data) {
    const announcement = await Announcement.findOne({ _id: id, tenantId });
    if (!announcement) {
      throw new Error("Announcement not found");
    }

    Object.assign(announcement, data);
    return await announcement.save();
  }

  async deleteAnnouncement(id, tenantId) {
    const announcement = await Announcement.findOne({ _id: id, tenantId });
    if (!announcement) {
      throw new Error("Announcement not found");
    }

    return await announcement.deleteOne();
  }
}

export default new AnnouncementService();
