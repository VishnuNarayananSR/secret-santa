import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editParticipant } from "../api/participant";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Input,
  Button,
  Form,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";

interface ParticipantEditProps {
  participantId: string;
  participantName: string;
  participantEmail: string;
  isOpen: boolean;
  onClose: () => void;
}

const ParticipantEdit: React.FC<ParticipantEditProps> = ({
  participantId,
  participantName: initialParticipantName,
  participantEmail: initialParticipantEmail,
  isOpen,
  onClose,
}) => {
  const [participantName, setParticipantName] = useState(
    initialParticipantName
  );
  const [participantEmail, setParticipantEmail] = useState(
    initialParticipantEmail
  );
  const queryClient = useQueryClient();
  const { groupId } = useParams();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      editParticipant({
        _id: participantId,
        name: participantName,
        email: participantEmail,
        groupId: groupId!,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["participants"],
      });
      onClose();
    },
  });

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    setParticipantName(initialParticipantName);
    setParticipantEmail(initialParticipantEmail);
  }, [initialParticipantName, initialParticipantEmail, isOpen]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent className="px-6 py-4">
        <ModalHeader>
          <h3 id="modal-title">Edit Participant</h3>
        </ModalHeader>
        <ModalBody className="flex flex-col justify-center gap-4">
          {isPending ? (
            <div className="text-center text-lg">Loading...</div>
          ) : error ? (
            <div className="text-center text-lg text-red-500">
              Error: {(error as Error).message}
            </div>
          ) : (
            <Form onSubmit={handleEdit} autoComplete="off">
              <Input
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Name"
              />
              <Input
                value={participantEmail}
                onChange={(e) => setParticipantEmail(e.target.value)}
                placeholder="Email"
                type="email"
                isRequired
                label="Group Name"
                name="name"
                variant="underlined"
                required
                fullWidth
              />
              <ModalFooter className="mx-auto gap-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  color="primary"
                  variant="flat"
                >
                  Save
                </Button>
                <Button type="button" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ParticipantEdit;
