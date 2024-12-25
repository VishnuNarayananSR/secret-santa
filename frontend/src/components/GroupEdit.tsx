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
  organizerName: string;
  organizerEmail: string;
  isOpen: boolean;
  onClose: () => void;
}

const GroupEdit: React.FC<GroupEditProps> = ({
  groupId,
  groupName: initialGroupName,
  groupPassword: initialGroupPassword,
  organizerName: initialOrganizerName,
  organizerEmail: initialOrganizerEmail,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    _id: groupId,
    name: initialGroupName,
    password: initialGroupPassword,
    organizer: { name: initialOrganizerName, email: initialOrganizerEmail },
  });
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => editGroup(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      onClose();
    },
  });

  const handleEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const key = name.replace("organizer.", "");
      setFormData((prevData) => ({
        ...prevData,
        organizer: { ...prevData.organizer, [key]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  useEffect(() => {
    setFormData({
      _id: groupId,
      name: initialGroupName,
      password: initialGroupPassword,
      organizer: { name: initialOrganizerName, email: initialOrganizerEmail },
    });
  }, [
    initialGroupName,
    initialGroupPassword,
    initialOrganizerName,
    initialOrganizerEmail,
    isOpen,
  ]);

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
            <div className="text-center text-lg">Saving...</div>
          ) : error ? (
            <div className="text-center text-lg text-error">
              Error: {error.message}
            </div>
          ) : (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                mutate();
              }}
              autoComplete="off"
            >
              <Input
                isRequired
                type="text"
                label="Group Name"
                name="name"
                value={formData.name}
                onChange={handleEdit}
                placeholder="Group Name"
                variant="underlined"
                required
                fullWidth
              />
              <Input
                isRequired
                type="text"
                label="Organizer Name"
                name="organizer.name"
                value={formData.organizer.name}
                onChange={handleEdit}
                placeholder="Organizer Name"
                variant="underlined"
                required
                fullWidth
              />
              <Input
                isRequired
                type="text"
                label="Organizer Email"
                name="organizer.email"
                value={formData.organizer.email}
                onChange={handleEdit}
                placeholder="Organizer Email"
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
