import apiClient from "./apiClient";
import {
  GetGroupsResponseType,
  CreateGroupResponseType,
  GetGroupResponseType,
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

export const getGroups = async () => {
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
