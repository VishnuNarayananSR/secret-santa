import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editGroup } from "../api/group";
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

interface GroupEditProps {
  groupId: string;
  groupName: string;
  groupPassword: string;
  isOpen: boolean;
  onClose: () => void;
}

const GroupEdit: React.FC<GroupEditProps> = ({
  groupId,
  groupName: initialGroupName,
  groupPassword: initialGroupPassword,
  isOpen,
  onClose,
}) => {
  const [groupName, setGroupName] = useState(initialGroupName);
  const [groupPassword, setGroupPassword] = useState(initialGroupPassword);
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      editGroup({
        _id: groupId,
        name: groupName,
        password: groupPassword,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      onClose();
    },
  });

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    setGroupName(initialGroupName);
    setGroupPassword(initialGroupPassword);
  }, [initialGroupName, initialGroupPassword, isOpen]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent className="px-6 py-4 md:p-8">
        <ModalHeader>
          <h3 id="modal-title">Edit Group</h3>
        </ModalHeader>
        <ModalBody>
          {isPending ? (
            <div className="text-center text-lg">Loading...</div>
          ) : error ? (
            <div className="text-center text-lg text-error">
              Error: {error.message}
            </div>
          ) : (
            <Form onSubmit={handleEdit} autoComplete="off">
              <Input
                isRequired
                type="text"
                label="Group Name"
                name="name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                variant="underlined"
                required
                fullWidth
              />
              {/* <Input
                label="Group Password"
                type="password"
                value={groupPassword}
                onChange={(e) => setGroupPassword(e.target.value)}
                className="w-full"
              /> */}
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

export default GroupEdit;
