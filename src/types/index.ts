import { HydratedDocument } from "mongoose";

//Participant Types
export type Participant = {
  name: string;
  email: string;
};
export type CreateParticipantRequestType = { groupId: string } & Participant;

export type CreateParticipantResponseType = {
  message: string;
};

//Group Types
export type Group = {
  name: string;
  password: string;
  organizer: Organizer;
  participants: Participant[];
};

export type GroupDocument = HydratedDocument<Group>;

export type CreateGroupRequestType = Omit<Group, "participants">;

export type CreateGroupResponseType = {
  message: string;
};

export type GetGroupResponseType = Omit<GroupDocument, "password">;
export type GetGroupsResponseType = Array<Pick<GroupDocument, "_id" | "name">>;

// Organizer Types
export type Organizer = Participant;

//API Shared Types
export type APIErrorResponse = {
  message: string;
  detail?: string;
};
