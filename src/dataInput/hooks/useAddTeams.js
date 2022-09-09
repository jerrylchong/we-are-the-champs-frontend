import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeams } from "../../utils/api";

const useAddTeams = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(addTeams, {
    onError: (error) => {
      toast({
        title: error.toString(),
        status: "error",
        isClosable: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teams"]);
      queryClient.invalidateQueries(["standings"]);
      toast({
        title: "Teams have been added",
        status: "success",
        isClosable: true,
      });
    },
  });
};

export default useAddTeams;
