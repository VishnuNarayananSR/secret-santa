import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../api/group";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import { Link } from "react-router-dom";
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
          <li key={group._id.toString()}>
            <Link to={`/groups/${group._id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
