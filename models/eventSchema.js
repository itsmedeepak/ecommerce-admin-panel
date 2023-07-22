import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String },
  start: { type: Date },
  end: { type: Date },
  allDay: { type: Boolean },
});

mongoose.models = {};
const Event = mongoose.model.Event || mongoose.model("Event", eventSchema);

module.exports = Event;
