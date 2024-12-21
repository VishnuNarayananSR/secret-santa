import mongoose, { Schema } from "mongoose";
import { Group } from "../types";

const groupSchema: Schema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  participants: {
    type: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
    ],
    default: [],
  },
});

const Group = mongoose.model<Group>("Group", groupSchema);

export default Group;
