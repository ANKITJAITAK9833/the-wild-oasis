import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
const clientQuery = useQueryClient();
const {mutate: createCabin, isPending: isCreating} = useMutation({
    mutationFn: (data) => createEditCabin(data),
    onSuccess: () => {
      toast.success("Cabin created successfully"); 
      clientQuery.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error("Error creating cabin: " + error.message);
    }
  });
    return { createCabin, isCreating };
}