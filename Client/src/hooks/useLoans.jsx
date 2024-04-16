import { useQuery } from "react-query";
import { getAllLoans } from "../utils/api.js";

const useLoans = () => {
  const { data, isError, isLoading, refetch } = useQuery(
    "allLoans",
    getAllLoans,
    { refetchOnWindowFocus: false }
  );
  return { data, isError, isLoading, refetch };
};

export default useLoans;
