import axios from "axios";
import { SuperQueries } from "../api/SuperQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WashType } from "../entities/Interfaces";
import { WashTypeDto } from "../entities/washTypeDTO";

const baseUrl = SuperQueries.baseUrl + "wash-type";

  export const useGetWashTypes = () => {
    return useQuery({
        queryKey: ['wash-types'],
        queryFn: async () => {
            const response = await axios.get<WashType[]>(baseUrl)
            console.log("Got data");
            
            return response.data;
        },
      })
}

export const useEditWashType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (editedWashType: WashTypeDto) => {
            return axios.put(baseUrl + editedWashType.id , editedWashType)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wash-types'] })
          }  
    })
}