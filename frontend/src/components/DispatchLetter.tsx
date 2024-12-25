import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
  Input,
} from "@nextui-org/react";
import { dispatchLettersToSantas } from "../api/group";
import { useState } from "react";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";
import { useMutation } from "@tanstack/react-query";

const DispatchLetter = ({ groupId }: { groupId: string | undefined }) => {
  const [visible, setVisible] = useState(false);
  const [passCode, setPassCode] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => dispatchLettersToSantas(groupId!, passCode),
    onSuccess: (data: { message: string }) => {
      alert(data.message);
      setPassCode("");
      setVisible(false);
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      alert(error.response?.data.message);
    },
  });

  const handleDispatchLetters = () => {
    mutate();
  };

  return (
    <>
      <Button color="primary" variant="shadow" onPress={() => setVisible(true)}>
        Dispatch Letters
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        isOpen={visible}
        onClose={() => {
          setPassCode("");
          setVisible(false);
        }}
      >
        <ModalContent>
          <ModalHeader>
            <h2 id="modal-title" className="text-2xl font-bold">
              Confirm?
            </h2>
          </ModalHeader>
          <ModalBody>
            <p className="text-warning-600">
              Are you sure you want to dispatch the letters?
            </p>
            <p className="text-xs text-danger">
              This will send email to all participants and group organizer.
            </p>
            <Input
              label="Enter passcode to confirm."
              variant="underlined"
              color="primary"
              value={passCode}
              type="password"
              onChange={(e) => setPassCode(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => setVisible(false)}
            >
              Cancel
            </Button>
            <Button
              onPress={handleDispatchLetters}
              isDisabled={isPending || !passCode}
              color="secondary"
              variant="flat"
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DispatchLetter;
