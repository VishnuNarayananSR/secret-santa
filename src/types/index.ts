import { HydratedDocument } from "mongoose";

//Participant Types
export type Participant = {
  _id: string;
  name: string;
  email: string;
};
export type GetParticipantsResponseType = Array<Participant>;

export type CreateParticipantRequestType = { groupId: string } & Participant;

export type CreateParticipantResponseType = {
  message: string;
};

export type EditParticipantRequestParamsType = {
  groupId: string;
  participantId: string;
};
export type EditParticipantRequestType = Partial<Participant>;
export type EditParticipantResponseType = CreateParticipantResponseType;

export type DeleteParticipantResponseType = CreateParticipantResponseType;

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

export type EditGroupRequestType = Partial<
  Omit<Group, "participants" | "password">
>;
export type EditGroupResponseType = CreateGroupResponseType;

export type DeleteGroupResponseType = CreateGroupResponseType;

export type GetGroupResponseType = Omit<
  GroupDocument,
  "password" | "participants"
>;
export type GetGroupsResponseType = Array<Pick<GroupDocument, "_id" | "name">>;

// Organizer Types
export type Organizer = Participant;

//API Shared Types
export type APIErrorResponse = {
  message: string;
  detail?: string;
};

//Email Service Types
export type EmailContext = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

//Santa Map Type
export type GiverAndReceiver = { giver: Participant; receiver: Participant };
