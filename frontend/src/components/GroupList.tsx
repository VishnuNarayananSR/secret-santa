import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../api/group";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
const GroupList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
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
      <h1>Groups</h1>
      <ul>
        {data?.map((group) => (
          <li key={group.name}>
            <a href={`/groups/${group._id}`}>{group.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
