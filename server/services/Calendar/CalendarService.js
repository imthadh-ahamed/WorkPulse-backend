import Event from "../../models/Calendar/Event.js";

class CalendarService {
  async createEvent(eventData) {
    return await Event.create(eventData);
  }

  async getEvents(query, page, limit) {
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ start: 1 });

    return { events, total };
  }

  async getEventById(id, tenantId) {
    return await Event.findOne({ _id: id, tenantId });
  }

  async getUpcomingEvents(tenantId, currentDate) {
    return await Event.find({
      tenantId,
      start: { $gte: currentDate },
    })
      .sort({ start: 1 })
      .limit(2);
  }

  async updateEvent(id, tenantId, updateData) {
    const event = await Event.findOne({ _id: id, tenantId });
    if (!event) return null;

    Object.assign(event, updateData);
    await event.save();
    return event;
  }

  async deleteEvent(id, tenantId) {
    const event = await Event.findOne({ _id: id, tenantId });
    if (!event) return null;

    await event.deleteOne();
    return event;
  }
}

export default new CalendarService();
