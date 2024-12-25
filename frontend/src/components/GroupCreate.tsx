import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../api/group";
import { useState } from "react";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  Input,
  Form,
} from "@nextui-org/react";

const GroupCreate = () => {
  const queryClient = useQueryClient();
  const emptyForm = {
    name: "",
    email: "",
    password: "",
    organizer: { name: "", email: "" },
  };
  const [formData, setFormData] = useState(emptyForm);
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setFormData(emptyForm);
      setVisible(false);
    },
  });

  const [visible, setVisible] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData);
  };

  return (
    <div>
      <Button
        onPress={() => setVisible(true)}
        color="primary"
        variant="bordered"
        className="w-full md:flex-initial flex-1"
      >
        Create Group
      </Button>
      <Modal
        closeButton
        isOpen={visible}
        onClose={() => {
          setFormData(emptyForm);
          setVisible(false);
        }}
        className="md:max-w-md"
      >
        <ModalContent className="px-6 py-4 md:p-8">
          <ModalHeader>
            <h2
              id="modal-title"
              className="text-2xl font-bold mb-4 text-primary"
            >
              Add Group
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
                  label="Group Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  variant="underlined"
                  required
                  fullWidth
                />
                <Input
                  isRequired
                  type="email"
                  name="organizer.email"
                  value={formData.organizer.email}
                  onChange={handleChange}
                  label="Organizer Email"
                  variant="underlined"
                  required
                  fullWidth
                />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  label="Passcode"
                  description="This will be asked when dispatching letters."
                  variant="underlined"
                  required
                  fullWidth
                />
              </div>
              {isError && (
                <p className="text-error-500 mt-2">
                  Error:{" "}
                  {
                    (error as AxiosError<APIErrorResponse>).response?.data
                      .message
                  }
                </p>
              )}
              <Button
                type="submit"
                color="primary"
                variant="bordered"
                disabled={isPending}
                className="w-full block md:w-auto md:px-4 md:py-2"
              >
                {isPending ? "Creating..." : "Create"}
              </Button>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupCreate;
