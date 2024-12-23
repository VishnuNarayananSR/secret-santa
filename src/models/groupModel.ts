import mongoose, { Schema } from "mongoose";
import { Group } from "../types";

const groupSchema: Schema = new Schema<Group>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  organizer: {
    type: {
      name: { type: String, required: true },
      email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
      },
    },
    required: true,
  },
  participants: {
    type: [
      {
        name: { type: String, required: true },
        email: {
          type: String,
          required: true,
          match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
        },
      },
    ],
    default: [],
  },
});

const Group = mongoose.model<Group>("Group", groupSchema);

export default Group;
