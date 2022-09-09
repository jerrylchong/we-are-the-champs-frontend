import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getTeams } from "../../utils/api";

const useTeamsData = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useQuery(["teams"], getTeams, {
    onError: (error) => {
      console.log(error);
      navigate("");
      toast({
        title: "Something went wrong, please try again",
        status: "error",
        isClosable: true,
      });
    },
  });
};

export default useTeamsData;
