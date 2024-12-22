import { CreateParticipantResponseType, Participant } from "../../../src/types";
import apiClient from "./apiClient";

export const addNewParticipant = async (
  participant: Participant & { groupId: string }
) => {
  try {
    const response = await apiClient.post<CreateParticipantResponseType>(
      "/participants",
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const editParticipant = async (
  participant: Participant & { groupId: string; _id: string }
) => {
  try {
    const response = await apiClient.put<CreateParticipantResponseType>(
      `/participants/${participant._id}`,
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteParticipant = async (
  participant: Participant & { groupId: string; id: string }
) => {
  try {
    const response = await apiClient.delete<CreateParticipantResponseType>(
      `/participants/${participant.id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
