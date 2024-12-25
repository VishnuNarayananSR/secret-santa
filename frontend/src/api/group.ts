import apiClient from "./apiClient";
import {
  GetGroupsResponseType,
  CreateGroupResponseType,
  GetGroupResponseType,
  EditGroupResponseType,
  DeleteGroupResponseType,
} from "../../../src/types";

export const getGroup = async (id: string) => {
  try {
    const response = await apiClient.get<GetGroupResponseType>(`/groups/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getGroups: () => Promise<GetGroupsResponseType> = async () => {
  try {
    const response = await apiClient.get<GetGroupsResponseType>("/groups");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createGroup = async (group: {
  name: string;
  password: string;
}) => {
  try {
    const response = await apiClient.post<CreateGroupResponseType>(
      "/groups",
      group
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editGroup = async (group: {
  _id: string;
  name?: string;
  password?: string;
}) => {
  try {
    const response = await apiClient.patch<EditGroupResponseType>(
      `/groups/${group._id}`,
      group
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteGroup = async (id: string) => {
  try {
    const response = await apiClient.delete<DeleteGroupResponseType>(
      `/groups/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const dispatchLettersToSantas = async (
  groupId: string,
  passCode: string
) => {
  try {
    const response = await apiClient.post<{ message: string }>(
      `/groups/${groupId}/send-letters`,
      { passCode }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
