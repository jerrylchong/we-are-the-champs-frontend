import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import useClearData from "../hooks/useClearData";

const CONFIRMATION_TEXT = "We are the champions";

const ClearDataModal = ({ isOpen, setOpen }) => {
  const [inputTouched, setInputTouched] = useState(false);
  const [inputText, setInputText] = useState("");

  const { mutate: clearData, isLoading, isSuccess } = useClearData();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess, setOpen]);

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Clear all data</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text fontSize="sm">
            Are you sure you want to delete all data? All team and group data
            will be permanently lost.
          </Text>
          <Text
            sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
            fontSize="sm"
          >
            Type <strong>{CONFIRMATION_TEXT}</strong> to confirm.
          </Text>
          <FormControl
            isInvalid={inputTouched && inputText !== CONFIRMATION_TEXT}
          >
            <Input
              placeholder={CONFIRMATION_TEXT}
              fontSize="sm"
              onChange={(e) => setInputText(e.target.value)}
              onBlur={() => setInputTouched(true)}
            />
            <FormErrorMessage>Text does not match</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter gap={4}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            colorScheme="red"
            isDisabled={inputText !== CONFIRMATION_TEXT}
            onClick={clearData}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ClearDataModal;
