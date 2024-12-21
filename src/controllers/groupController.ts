import { Request, Response } from "express";
import Group from "../models/groupModel";
import {
  CreateGroupResponseType,
  APIErrorResponse,
  GetGroupsResponseType,
  GetGroupResponseType,
  CreateGroupRequestType,
} from "../types";

export const createGroup = async (
  req: Request<never, never, CreateGroupRequestType>,
  res: Response<CreateGroupResponseType | APIErrorResponse>
) => {
  try {
    const { name, organizer, password } = req.body;
    await Group.create({ name, password, organizer });
    res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating group",
      detail: (error as Error).message,
    } as const);
  }
};

export const getGroups = async (
  req: Request,
  res: Response<GetGroupsResponseType | APIErrorResponse>
) => {
  try {
    const groups = await Group.find({}, { _id: 1, name: 1 }).lean();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching groups",
      detail: (error as Error).message,
    });
  }
};

export const getGroupById = async (
  req: Request<{ id: string }>,
  res: Response<GetGroupResponseType | APIErrorResponse>
) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching group",
      detail: (error as Error).message,
    });
  }
};
