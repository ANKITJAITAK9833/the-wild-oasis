import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useEditCabin() {
const clientQuery = useQueryClient();

const {mutate: editCabin, isPending:isEditing} = useMutation({
    // In mutationFn, we destructure data and id from the object passed to mutate
    // We have to pass it in an object because mutate only accepts a single argument
    mutationFn: ({data,id}) => createEditCabin(data, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully"); 
      clientQuery.invalidateQueries({ queryKey: ['cabins'] });
      
    },
    onError: (error) => {
      toast.error("Error editing a cabin: " + error.message);
    }
  });
    return { editCabin, isEditing };
}