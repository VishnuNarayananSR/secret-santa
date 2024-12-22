import { Request, Response } from "express";
import { APIErrorResponse } from "../types";
import Group from "../models/groupModel";
import { shuffleAndAssignSecretSantas } from "../utils";

export const dispatchSantaLetters = async (
  req: Request<{ groupId: string }>,
  res: Response<{ message: string } | APIErrorResponse>
) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    // const { participants, organizer } = group;
    // const santaMap = shuffleAndAssignSecretSantas(participants);

    res.status(200).json({ message: "Santa Cards dispatched." });
  } catch (error) {
    res.status(500).json({
      message: "Error dispatching cards",
      detail: (error as Error).message,
    });
  }
};
