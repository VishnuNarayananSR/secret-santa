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
