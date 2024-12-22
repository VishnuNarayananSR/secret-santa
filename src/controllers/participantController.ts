import { Request, Response } from "express";
import {
  APIErrorResponse,
  CreateParticipantRequestType,
  CreateParticipantResponseType,
  DeleteParticipantResponseType,
  EditParticipantRequestParamsType,
  EditParticipantRequestType,
  EditParticipantResponseType,
} from "../types";
import Group from "../models/groupModel";

export const addNewParticipantByGroupId = async (
  req: Request<CreateParticipantRequestType>,
  res: Response<CreateParticipantResponseType | APIErrorResponse>
) => {
  try {
    const { groupId, name, email } = req.body;
    const participant = { name, email };
    await Group.findByIdAndUpdate(
      groupId,
      {
        $push: { participants: participant },
      },
      { runValidators: true }
    );
    res.status(200).json({ message: "Participant added successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error adding participant",
      detail: (error as Error).message,
    });
  }
};

export const editParticipantByGroupId = async (
  req: Request<
    EditParticipantRequestParamsType,
    never,
    EditParticipantRequestType
  >,
  res: Response<EditParticipantResponseType | APIErrorResponse>
) => {
  try {
    const { groupId, participantId } = req.params;
    const { name, email } = req.body;
    await Group.updateOne(
      { _id: groupId, "participants._id": participantId },
      {
        $set: {
          "participants.$.name": name,
          "participants.$.email": email,
        },
      }
    );
    res.status(200).json({ message: "Participant updated successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error editing participant",
      detail: (error as Error).message,
    });
  }
};

export const deleteParticipantByGroupId = async (
  req: Request<EditParticipantRequestParamsType, never, never>,
  res: Response<DeleteParticipantResponseType | APIErrorResponse>
) => {
  try {
    const { groupId, participantId } = req.params;
    await Group.updateOne(
      { _id: groupId },
      {
        $pull: { participants: { _id: participantId } },
      }
    );
    res.status(200).json({ message: "Participant deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting participant",
      detail: (error as Error).message,
    });
  }
};
