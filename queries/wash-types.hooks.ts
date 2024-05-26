import axios from "axios";
import { SuperQueries } from "../api/SuperQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WashType } from "../entities/Interfaces";
import { WashTypeDto } from "../entities/washTypeDTO";
import { Alert } from "react-native";

const baseUrl = SuperQueries.baseUrl + "wash-type";

  export const useGetWashTypes = () => {
    return useQuery({
        queryKey: ['wash-types'],
        queryFn: async () => {
            // try {
                const response = await axios.get<WashType[]>(baseUrl);
                console.log("Got data");
                return response.data;
            //   } catch (error) {
            //     throw new Error
            //   }
        },
      })
}

export const useEditWashType = () => {
    const queryClient = useQueryClient();
    console.log("from query")

    return useMutation({
        mutationFn: (editedWashType: WashTypeDto) => {
            console.log("query 30",editedWashType)
            return axios.put(`${baseUrl}/${editedWashType.id}` , editedWashType)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wash-types'] })
            Alert.alert("Price changed")

          },
          onError: (error) => {
            console.log(error);
        }  
    })
}