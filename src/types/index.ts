import { HydratedDocument } from "mongoose";

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

export type GroupDocument = HydratedDocument<Group>;

export type CreateGroupRequestType = Omit<Group, "participants">;

export type CreateGroupResponseType = {
  message: string;
};

export type GetGroupResponseType = Omit<GroupDocument, "password">;
export type GetGroupsResponseType = Array<Pick<GroupDocument, "_id" | "name">>;

//API Shared Types
export type APIErrorResponse = {
  message: string;
  detail?: string;
};
