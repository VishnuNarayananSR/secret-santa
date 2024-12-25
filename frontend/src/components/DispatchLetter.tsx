import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
} from "@nextui-org/react";
import { dispatchLettersToSantas } from "../api/group";
import { useState } from "react";

const DispatchLetter = ({ groupId }: { groupId: string | undefined }) => {
  const [visible, setVisible] = useState(false);

  const handleDispatchLetters = async () => {
    try {
      const { message } = await dispatchLettersToSantas(groupId!);
      alert(message);
    } catch (error) {
      console.error(error);
    }
    setVisible(false);
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
        onClose={() => setVisible(false)}
      >
        <ModalContent>
          <ModalHeader>
            <h2 id="modal-title" className="text-2xl font-bold mb-4">
              Confirm?
            </h2>
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to dispatch the letters?</p>
            <p className="text-sm text-danger-600">
              This will send email to all participants and group organizer.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button onPress={handleDispatchLetters}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DispatchLetter;
