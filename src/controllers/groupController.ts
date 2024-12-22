import { Request, Response } from "express";
import Group from "../models/groupModel";
import {
  CreateGroupResponseType,
  APIErrorResponse,
  GetGroupsResponseType,
  GetGroupResponseType,
  CreateGroupRequestType,
  EditGroupRequestType,
  EditGroupResponseType,
  DeleteGroupResponseType,
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
    const group = await Group.findById(id, { password: 0, participants: 0 });
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
export const editGroup = async (
  req: Request<{ id: string }, never, EditGroupRequestType>,
  res: Response<APIErrorResponse | EditGroupResponseType>
) => {
  try {
    const { id } = req.params;
    const { name, organizer } = req.body;
    const group = await Group.findByIdAndUpdate(
      id,
      { name, organizer },
      { runValidators: true }
    );
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.status(200).json({ message: "Group updated" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating group",
      detail: (error as Error).message,
    });
  }
};

export const deleteGroup = async (
  req: Request<{ id: string }>,
  res: Response<APIErrorResponse | DeleteGroupResponseType>
) => {
  try {
    const { id } = req.params;
    const group = await Group.findByIdAndDelete(id);
    if (!group) {
      res.status(404).json({ message: "Group not found" });
      return;
    }
    res.status(200).json({ message: "Group deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting group",
      detail: (error as Error).message,
    });
  }
};
