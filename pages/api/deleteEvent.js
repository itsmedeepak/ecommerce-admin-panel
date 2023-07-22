import mongoose from "mongoose";
import Event from "../../models/eventSchema";

export default async function addproduct(req, res) {
  // connect to the database

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");

    const { id} = req.body;
    console.log("req.body.eventId",id, req.body)
    const eventId = id

    // Create a new event using the Event model
    const event_ = await Event.deleteOne({ title: eventId });

    console.log("deleted", event_)
    
    const events = await Event.find()
    // console.log(events)
    res.status(201).json({ events:events});
  } catch (error) {
    console.error("Error saving event to the database", error);
    res.status(500).json({ message: "Error saving event" });
  }
}
