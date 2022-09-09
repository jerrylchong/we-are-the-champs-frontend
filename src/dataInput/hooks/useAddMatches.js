import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMatches } from "../../utils/api";

const useAddMatches = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(addMatches, {
    onError: (error) => {
      console.log("addMatches error", error);
      toast({
        title: "Error",
        status: "error",
        isClosable: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["standings"]);
      toast({
        title: "Matches have been added",
        status: "success",
        isClosable: true,
      });
    },
  });
};

export default useAddMatches;
