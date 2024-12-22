import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getGroup, editGroup, deleteGroup } from "../api/group";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import { FC, useState } from "react";

const Group: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, data, error } = useQuery({
    queryKey: ["group", id],
    queryFn: () => getGroup(id!),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupPassword, setGroupPassword] = useState("");

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
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await editGroup({
                  _id: data._id.toString(),
                  name: groupName,
                  password: groupPassword,
                });
                queryClient.invalidateQueries({
                  queryKey: ["participant", id],
                });
                setIsEditing(false);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <label>
              Group Name:
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </label>
            <label>
              Group Password:
              <input
                type="password"
                value={groupPassword}
                onChange={(e) => setGroupPassword(e.target.value)}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        )}
        <button
          onClick={async () => {
            try {
              await deleteGroup(data._id.toString());
              navigate("/");
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Delete Group
        </button>
      </div>
    );
  }
};

export default Group;
