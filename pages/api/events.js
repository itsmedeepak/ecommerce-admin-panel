import mongoose from "mongoose";
import Event from "../../models/eventSchema";

export default async function addproduct(req, res) {
  // connect to the database

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");

    const { title, start, end, allDay } = req.body;

    // Create a new event using the Event model
    const event = new Event({
      title,
      start,
      end,
      allDay,
    });

    // Save the event to the database
    const savedEvent = await event.save();
    console.log("events saved")

    // Return the inserted event ID
    // console.log(savedEvent)
    const events = await Event.find()
    console.log(events)
    res.status(201).json({ events:events});
  } catch (error) {
    console.error("Error saving event to the database", error);
    res.status(500).json({ message: "Error saving event" });
  }
}
