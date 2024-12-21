import { Request, Response } from "express";
import {
  APIErrorResponse,
  CreateParticipantRequestType,
  CreateParticipantResponseType,
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
