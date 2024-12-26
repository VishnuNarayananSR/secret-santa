import { Request, Response } from "express";
import { APIErrorResponse, EmailContext, Participant } from "../types";
import Group from "../models/groupModel";
import { shuffleAndAssignSecretSantas } from "../utils";
import { composeEmailObjects, sendSantaEmails } from "../services/emailService";

export const dispatchSantaLetters = async (
  req: Request<{ groupId: string }, never, { passCode: string }>,
  res: Response<{ message: string } | APIErrorResponse>
) => {
  try {
    const { groupId } = req.params;
    const { passCode } = req.body;
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    if (passCode != group.password) {
      res
        .status(403)
        .json({ message: "Invalid passcode. Letters will not be dispatched." });
      return;
    }
    const { participants, organizer, name: groupName } = group;
    const assignedSantas = shuffleAndAssignSecretSantas(participants);
    const emailObjects = composeEmailObjects(
      groupName,
      organizer,
      assignedSantas
    );
    await sendSantaEmails(emailObjects);
    res.status(200).json({ message: "Letters dispatched successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error dispatching cards",
      detail: (error as Error).message,
    });
  }
};
