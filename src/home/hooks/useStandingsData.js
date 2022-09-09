import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStandings } from "../../utils/api";

const useStandingsData = () => {
  const toast = useToast();

  return useQuery(["standings"], getStandings, {
    onError: (error) => {
      console.log(error);
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
    },
  });
};

export default useStandingsData;
