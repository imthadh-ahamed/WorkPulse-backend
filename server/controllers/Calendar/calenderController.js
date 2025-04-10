import Event from "../../models/Calendar/Event.js";

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

    const newEvent = await Event.create({
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
    const { title, page = 1, limit = 7 } = req.query;

    const query = { tenantId };

    // Optional title search (case-insensitive)
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get total count for pagination metadata
    const total = await Event.countDocuments(query);

    const events = await Event.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ start: 1 }); // Sort by start date in ascending order

    res.status(200).json({
      data: events,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const event = await Event.findOne({ _id: id, tenantId });

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

    const upcomingEvents = await Event.find({
      tenantId,
      start: { $gte: currentDate },
    })
      .sort({ start: 1 }) // Sort by start date in ascending order
      .limit(2); // Limit the results to 2

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

    const event = await Event.findOne({ _id: id, tenantId });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    event.title = title;
    event.description = description;
    event.start = start;
    event.end = end;
    event.location = location;
    event.type = type;
    event.repeat = repeat;
    event.repeatEndDate = repeatEndDate;
    event.modified = new Date();
    event.modifiedBy = modifiedBy;

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;

    const event = await Event.findOne({ _id: id, tenantId });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    await event.deleteOne({ _id: id, tenantId });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
