import { useParams } from "react-router-dom";
import AddParticipant from "../components/AddParticipant";
import {
  getParticipants,
  editParticipant,
  deleteParticipant,
} from "../api/participant";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import { useState } from "react";
import { dispatchLettersToSantas } from "../api/group";

const Participants = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ["participant", id],
    queryFn: () => getParticipants(id!),
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {(error as AxiosError<APIErrorResponse>).response?.data.message}
      </div>
    );
  }

  const handleEdit = async (participantId: string) => {
    try {
      await editParticipant({
        _id: participantId,
        groupId: id!,
        name: participantName,
        email: participantEmail,
      });
      queryClient.invalidateQueries({ queryKey: ["participant", id] });
      setIsEditing(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (participantId: string) => {
    try {
      await deleteParticipant({ id: participantId, groupId: id! });
      queryClient.invalidateQueries({ queryKey: ["participant", id] });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDispatchLetters = async () => {
    try {
      const { message } = await dispatchLettersToSantas(id!);
      alert(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Participants</h1>
      <ul>
        {data?.map((participant) => (
          <li key={participant.email}>
            {isEditing === participant._id.toString() ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(participant._id.toString());
                }}
              >
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={participantEmail}
                  onChange={(e) => setParticipantEmail(e.target.value)}
                  placeholder="Email"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditing(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <p>{participant.name}</p>
                <p>{participant.email}</p>
                <button
                  onClick={() => {
                    setIsEditing(participant._id.toString());
                    setParticipantName(participant.name);
                    setParticipantEmail(participant.email);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(participant._id.toString())}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <AddParticipant />
      </div>
      <button onClick={handleDispatchLetters}>
        Dispatch Letters to Santas
      </button>
    </div>
  );
};

export default Participants;
