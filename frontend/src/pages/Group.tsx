import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getGroup } from "../api/group";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import { FC } from "react";
import AddParticipant from "../components/AddParticipant";

const Group: FC = () => {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["participant", id],
    queryFn: () => getGroup(id!),
  });

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
  if (data) {
    return (
      <div>
        <h1>{data.name}</h1>
        <h2>Organizer</h2>
        <p>{data.organizer.name}</p>
        <p>{data.organizer.email}</p>
        <ul>
          {data.participants.map((participant) => (
            <li key={participant.email}>
              <p>{participant.name}</p>
              <p>{participant.email}</p>
            </li>
          ))}
        </ul>

        <AddParticipant />
      </div>
    );
  }
};

export default Group;
