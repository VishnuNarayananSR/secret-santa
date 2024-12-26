import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "../api/participant";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  ScrollShadow,
  Spinner,
  User,
} from "@nextui-org/react";
import { EllipsisVeritcal } from "../assets/Icons";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import ParticipantDelete from "./ParticipantDelete";
import ParticipantEdit from "./ParticipantEdit";

const ParticipantList = () => {
  const { groupId } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["participants"],
    queryFn: async () => await getParticipants(groupId!),
  });

  const [selectedParticipantId, setSelectedParticipantId] = useState<
    string | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSelect = (
    option: { key: string; value: string },
    participantId: string
  ) => {
    setSelectedParticipantId(participantId);
    if (option.key === "edit") {
      setIsEditModalOpen(true);
    } else if (option.key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center gap-4">
        <Spinner color="secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <p color="error">
          Error:{" "}
          {(error as AxiosError<APIErrorResponse>).response?.data.message ||
            "Network Error"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-primary-500 mb-6">
        Participants:
      </h2>
      <ScrollShadow
        hideScrollBar
        size={60}
        className="mt-2 max-h-[calc(100vh-26rem-env(safe-area-inset-bottom))]"
      >
        <div className="flex flex-wrap gap-4">
          {data?.map((participant) => (
            <Card className="shadow-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
              <CardHeader className="flex justify-between items-center mt-1">
                <User
                  key={participant._id.toString()}
                  avatarProps={{
                    src: `https://api.dicebear.com/9.x/glass/svg?seed=${participant.email}`,
                  }}
                  name={participant.name}
                  description={participant.email}
                />
                <DropdownMenu
                  items={[
                    { key: "delete", value: "Delete" },
                    { key: "edit", value: "Edit" },
                  ]}
                  onSelect={(option) =>
                    option && handleSelect(option, participant._id.toString())
                  }
                >
                  <button className="hover:scale-125 outline-none transition duration-200">
                    <EllipsisVeritcal />
                  </button>
                </DropdownMenu>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="h-10"></div>
      </ScrollShadow>

      <ParticipantEdit
        participantId={selectedParticipantId!}
        participantName={
          data?.find((p) => p._id.toString() === selectedParticipantId)?.name ||
          ""
        }
        participantEmail={
          data?.find((p) => p._id.toString() === selectedParticipantId)
            ?.email || ""
        }
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <ParticipantDelete
        groupId={groupId!}
        participantId={selectedParticipantId!}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ParticipantList;
