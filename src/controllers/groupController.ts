import { Request, Response } from "express";
import Group from "../models/groupModel";
import {
  CreateGroupResponseType,
  APIErrorResponse,
  GetGroupsResponseType,
} from "../types";

export const createGroup = async (
  req: Request,
  res: Response<CreateGroupResponseType | APIErrorResponse>
) => {
  try {
    const { name, password } = req.body;
    await Group.create({ name, password });
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
    const groups = await Group.find({ _id: 1, name: 1 });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching groups",
      detail: (error as Error).message,
    });
  }
};
