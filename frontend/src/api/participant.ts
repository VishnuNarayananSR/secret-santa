import {
  GetParticipantsResponseType,
  CreateParticipantResponseType,
  Participant,
} from "../../../src/types";
import apiClient from "./apiClient";

export const getParticipants = async (groupId: string) => {
  try {
    const response = await apiClient.get<GetParticipantsResponseType>(
      `/participants/${groupId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
    const { _id, groupId } = participant;
    const response = await apiClient.patch<CreateParticipantResponseType>(
      `/participants/${groupId}/${_id}`,
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteParticipant = async (participant: {
  groupId: string;
  id: string;
}) => {
  try {
    const response = await apiClient.delete<CreateParticipantResponseType>(
      `/participants/${participant.groupId}/${participant.id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
