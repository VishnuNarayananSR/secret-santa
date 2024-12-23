import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewParticipant } from "../api/participant";
import { useState } from "react";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  Form,
  Input,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";

const ParticipantCreate = () => {
  const { groupId } = useParams();
  const queryClient = useQueryClient();
  const emptyForm = {
    name: "",
    email: "",
  };
  const [formData, setFormData] = useState(emptyForm);
  const { mutate, isPending, error } = useMutation({
    mutationFn: addNewParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      setFormData(emptyForm);
      setVisible(false);
    },
  });

  const [visible, setVisible] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ ...formData, groupId: groupId! });
  };
  return (
    <div>
      <Button
        onPress={() => setVisible(true)}
        color="primary"
        variant="bordered"
        className="w-full md:flex-initial flex-1"
      >
        Create Participant
      </Button>
      <Modal
        closeButton
        isOpen={visible}
        onClose={() => setVisible(false)}
        className="md:max-w-md"
      >
        <ModalContent className="px-6 py-4 md:p-8">
          <ModalHeader>
            <h2 id="modal-title" className="text-2xl font-bold mb-4">
              Create Participant
            </h2>
          </ModalHeader>
          <ModalBody>
            <Form
              validationBehavior="native"
              onSubmit={handleSubmit}
              className="space-y-4 w-full"
              autoComplete="off"
              autoCapitalize="words"
            >
              <div className="space-y-4 w-full">
                <Input
                  isRequired
                  type="text"
                  label="Participant Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Participant Name"
                  variant="underlined"
                  required
                  fullWidth
                />
                <Input
                  isRequired
                  type="email"
                  label="Participant Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Participant Email"
                  variant="underlined"
                  required
                  fullWidth
                />
                <div className="py-4"></div>
                <Button
                  type="submit"
                  color="primary"
                  variant="bordered"
                  disabled={isPending}
                  className="w-full block md:w-auto md:px-4 md:py-2"
                >
                  {isPending ? "Creating..." : "Create"}
                </Button>
                {error && (
                  <p className="text-danger mt-4">
                    Error:{" "}
                    {
                      (error as AxiosError<APIErrorResponse>).response?.data
                        .message
                    }
                  </p>
                )}
              </div>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ParticipantCreate;
