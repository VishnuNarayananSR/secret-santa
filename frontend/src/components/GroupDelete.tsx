import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "../api/group";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Button,
  Spinner,
} from "@nextui-org/react";

interface GroupDeleteProps {
  groupId: string;
  isOpen: boolean;
  onClose: () => void;
}

const GroupDelete: React.FC<GroupDeleteProps> = ({
  groupId,
  isOpen,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);
  const { mutate, error } = useMutation({
    mutationFn: () => deleteGroup(groupId),
    onSuccess: () => {
      setIsPending(false);
      // queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      onClose();
    },
  });

  const handleDelete = () => {
    setIsPending(true);
    mutate();
  };

  return (
    <Modal isOpen={isOpen} closeButton={!isPending} onClose={onClose}>
      <ModalContent className="px-4 py-3 md:px-6 md:py-4">
        <ModalHeader>
          <h4 className="text-lg font-semibold text-primary-500">
            Delete Group
          </h4>
        </ModalHeader>
        <ModalBody>
          {isPending ? (
            <div className="flex justify-center">
              <Spinner className="text-primary-500" />
            </div>
          ) : error ? (
            <div className="text-error-500">Error: {error.message}</div>
          ) : (
            <div>Are you sure you want to delete this group?</div>
          )}
        </ModalBody>
        <ModalFooter className="flex justify-end space-x-2">
          {!isPending && !error && (
            <>
              <Button
                variant="flat"
                color="danger"
                onPress={handleDelete}
                className="text-sm md:text-base"
              >
                Yes
              </Button>
              <Button
                variant="flat"
                onPress={onClose}
                className="text-sm md:text-base"
              >
                No
              </Button>
            </>
          )}
          {error && (
            <Button
              variant="flat"
              color="warning"
              onPress={() => window.location.reload()}
              className="text-sm md:text-base"
            >
              Retry
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GroupDelete;
