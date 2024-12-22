import { useParams } from "react-router-dom";
import AddParticipant from "../components/AddParticipant";
import { getParticipants } from "../api/participant";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";

const Participants = () => {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["participant", id],
    queryFn: () => getParticipants(id!),
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

  return (
    <div>
      <h1>Partipants</h1>
      <ul>
        {data?.map((participant) => (
          <li key={participant.email}>
            <p>{participant.name}</p>
            <p>{participant.email}</p>
          </li>
        ))}
      </ul>
      <div>
        <AddParticipant />
      </div>
    </div>
  );
};

export default Participants;
