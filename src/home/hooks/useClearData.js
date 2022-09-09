import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearData } from "../../utils/api";

const useClearData = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(clearData, {
    onError: (error) => {
      console.log("useClearData error", error);
      toast({
        title: "Error",
        status: "error",
        isClosable: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["standings"]);
      toast({
        title: "All data has been cleared",
        status: "success",
        isClosable: true,
      });
    },
  });
};

export default useClearData;
