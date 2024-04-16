import { useQuery } from "react-query";
import { getAllLawyers } from "../utils/api.js";

const useLawyers = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    "allLawyers",
    getAllLawyers,
    { refetchOnWindowFocus: false }
  );
  return { data, isError, isLoading, refetch };
};

export default useLawyers;
