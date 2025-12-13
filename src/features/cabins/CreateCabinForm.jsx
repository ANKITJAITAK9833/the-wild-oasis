
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}, onCloseModal}) {
  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const {errors} = formState;
 const {createCabin, isCreating} = useCreateCabin();

const {editCabin, isEditing} = useEditCabin();
const isWorking = isCreating || isEditing;
function onSubmit(data){
  const image = data.image && typeof data.image === 'object' ?  data.image[0] : data.image ;
   if(isEditSession){
    editCabin({data: {...data, image: image}, id: editId},{ onSuccess: () => reset()});
   }else {
     createCabin({...data, image: image},{ onSuccess: () => reset()});
   }
   onCloseModal?.();
}

function onError(errors){
    console.log(errors);
}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}
    type={onCloseModal ? "modal" : "regular"}> 
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text"  id="name" disabled={isWorking} {...register("name", {
          required: "This filed is required"
        })}/>
      </FormRow>

      <FormRow label="Maximum capacity"  error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking}{...register("maxCapacity", {
          required: "This filed is required",
          min: {value:1, message:"Capacity must be at least 1"}
        })}/>
      </FormRow>

      <FormRow label="Regular price"  error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice"  disabled={isWorking} {...register("regularPrice", {
          required: "This filed is required",
          min: {value:0, message:"Price must be at least 0"}
        })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking}  {...register("discount", {
          required: "This filed is required",
          validate: (value) => value <= getValues()?.regularPrice|| "Discount must less than regular price"
        })} />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea type="number" disabled={isWorking}  id="description" defaultValue="" {...register("description", {
          required: "This filed is required"
        })}/>
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" disabled={isWorking}  {...register("image", {
          required: isEditSession ? false : "This filed is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button  variation="secondary" type="reset" onClick={
   () => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}> { isEditSession ? 'Edit cabin':'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
