import apiClient from "./apiClient";
import {
  GetGroupsResponseType,
  CreateGroupResponseType,
} from "../../../src/types";

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
