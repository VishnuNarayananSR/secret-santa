import { Document } from "mongoose";

//Participant Types
export type Participant = {
  name: string;
  email: string;
};

//Group Types
export type Group = {
  name: string;
  password: string;
  participants: Participant[];
};

export type GroupDocument = Document & Group;
