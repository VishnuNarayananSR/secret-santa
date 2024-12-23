import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "../api/participant";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  Spinner,
  TableColumn,
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

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "actions", label: "Actions" },
  ];

  const rows = data?.map((participant) => ({
    key: participant._id.toString(),
    name: participant.name,
    email: participant.email,
    actions: participant._id.toString(),
  }));

  const renderCell = (
    item: {
      key: string;
      name: string;
      email: string;
      actions: string;
    },
    columnKey: any
  ) => {
    switch (columnKey) {
      case "name":
        return (
          <p className="text-lg capitalize text-primary-600">{item.name}</p>
        );
      case "email":
        return <p className="text-lg ">{item.email}</p>;
      case "actions":
        return (
          <DropdownMenu
            items={[
              { key: "delete", value: "Delete" },
              { key: "edit", value: "Edit" },
            ]}
            onSelect={(option) => option && handleSelect(option, item.actions)}
          >
            <button className="hover:scale-125 outline-none transition duration-200">
              <EllipsisVeritcal />
            </button>
          </DropdownMenu>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-primary-500 mb-6">
        Participants:
      </h2>
      <Table aria-label="Participants List" shadow="md" isStriped isCompact>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} emptyContent={"No participants added."}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

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
