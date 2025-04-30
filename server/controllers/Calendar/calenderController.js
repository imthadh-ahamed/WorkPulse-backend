import CalendarService from "../../services/Calendar/CalendarService.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      start,
      end,
      location,
      type,
      repeat,
      repeatEndDate,
    } = req.body;
    const { tenantId } = req.user;
    const createdBy = req.user.id;

    const newEvent = await CalendarService.createEvent({
      title,
      description,
      start,
      end,
      location,
      type,
      repeat,
      repeatEndDate,
      tenantId,
      created: new Date(),
      createdBy,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const { page = 1, limit = 7, search = "" } = req.query;

    const events = await CalendarService.getEvents(
      tenantId,
      page,
      limit,
      search
    );

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const event = await CalendarService.getEventById(id, tenantId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUpcomingEvents = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const currentDate = new Date();

    const upcomingEvents = await CalendarService.getUpcomingEvents(
      tenantId,
      currentDate
    );

    res.status(200).json(upcomingEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      start,
      end,
      location,
      type,
      repeat,
      repeatEndDate,
    } = req.body;
    const { tenantId } = req.user;
    const modifiedBy = req.user.id;

    const updateData = {
      title,
      description,
      start,
      end,
      location,
      type,
      repeat,
      repeatEndDate,
      modified: new Date(),
      modifiedBy,
    };

    const event = await CalendarService.updateEvent(id, tenantId, updateData);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const event = await CalendarService.deleteEvent(id, tenantId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
