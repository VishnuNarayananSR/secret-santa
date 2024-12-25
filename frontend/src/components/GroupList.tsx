import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../api/group";
import { AxiosError } from "axios";
import { APIErrorResponse, GetGroupsResponseType } from "../../../src/types";
import { Link } from "react-router-dom";
import { Card, Spinner } from "@nextui-org/react";
import { EllipsisVeritcal } from "../assets/Icons";
import DropdownMenu from "./DropdownMenu";
import EditGroup from "./GroupEdit";
import DeleteGroup from "./GroupDelete";
import { useState } from "react";

const GroupList = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  const [selectedGroup, setSelectedGroup] = useState<
    GetGroupsResponseType[number] | null
  >(null);
  useState<GetGroupsResponseType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSelect = (
    option: { key: string; value: string },
    groupId: string
  ) => {
    setSelectedGroup(
      data?.find((group) => group._id.toString() === groupId) || null
    );
    if (option.key === "edit") {
      setIsEditModalOpen(true);
    } else if (option.key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center gap-4">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <h4 color="error">
          Error:{" "}
          {(error as AxiosError<APIErrorResponse>).response?.data.message ||
            "Network Error"}
        </h4>
      </div>
    );
  }
  return (
    <div className="flex flex-col container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-primary-500 mb-6">Groups:</h2>

      <div className="mb-4 md:mb-6 lg:mb-8">
        {data?.length === 0 && (
          <div className="flex justify-center items-center">
            <h4 className="text-lg">No groups found. Create a new one</h4>
          </div>
        )}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          {data?.map((group) => (
            <Card
              shadow="md"
              key={group._id.toString()}
              className="p-4 rounded-lg md:p-6 lg:p-8"
            >
              <div className="flex flex-row justify-between items-center md:items-start">
                <Link
                  to={`${group._id}/participants/`}
                  className="text-lg font-semibold text-secondary-500 md:text-xl lg:text-2xl hover:underline self-start"
                >
                  <h4 className="ml-6 capitalize">{group.name}</h4>
                </Link>
                <DropdownMenu
                  items={[
                    { key: "delete", value: "Delete" },
                    { key: "edit", value: "Edit" },
                  ]}
                  onSelect={(option) => {
                    if (option) {
                      handleSelect(option, group._id.toString());
                    }
                  }}
                >
                  <button className="hover:scale-125 outline-none transition duration-200">
                    <EllipsisVeritcal />
                  </button>
                </DropdownMenu>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <EditGroup
        groupId={selectedGroup?._id.toString()!}
        groupName={selectedGroup?.name || ""}
        groupPassword={""}
        organizerName={selectedGroup?.organizer.name || ""}
        organizerEmail={selectedGroup?.organizer.email || ""}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      <DeleteGroup
        groupId={selectedGroup?._id.toString()!}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default GroupList;
