import mongoose from "mongoose";
import Event from "../../models/eventSchema";

export default async function addproduct(req, res) {
  // connect to the database

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    mongoose.set("strictQuery", true);
    console.log("DB Connected");

    const events = await Event.find()
    // console.log(events)
    res.status(201).json({ events:events});
  } catch (error) {
    console.error("Error saving event to the database", error);
    res.status(500).json({ message: "Error saving event" });
  }
}
