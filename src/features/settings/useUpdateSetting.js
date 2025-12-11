import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
export function useUpdateSetting() {
const clientQuery = useQueryClient();

const {mutate: updateSetting, isPending:isUpdating} = useMutation({
    // In mutationFn, we destructure data and id from the object passed to mutate
    // We have to pass it in an object because mutate only accepts a single argument
    mutationFn:updateSettingApi,
    onSuccess: () => {
      toast.success("Settings edited successfully"); 
      clientQuery.invalidateQueries({ queryKey: ['settings'] });
      
    },
    onError: (error) => {
      toast.error("Error editing a cabin: " + error.message);
    }
  });
    return { updateSetting, isUpdating };
}