import axios from "axios";
import { SuperQueries } from "../api/SuperQueries";
import { Extra } from "../entities/Extra";
import { useQuery } from "@tanstack/react-query";

const baseUrl = SuperQueries.baseUrl + "extra";

  export const useGetExtras = () => {
    return useQuery({
        queryKey: ['extras'],
        queryFn: async () => {
            try {
                const response = await axios.get<Extra[]>(baseUrl);
                console.log("Got data");
                return response.data;
              } catch (error) {
                throw new Error
              }
        },
      })
}

