import { useMutation, useQueryClient } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({cabin}) {
  const clientQuery = useQueryClient();
  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const {errors} = formState;
  const {mutate, isPending} = useMutation({
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      clientQuery.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (error) => {
      toast.error("Error creating cabin: " + error.message);
    }
  });

function onSubmit(data){
  console.log(data);
    mutate({...data, image: data?.image[0]});
}

function onError(errors){
    console.log(errors);
}

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}> 
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" defaultValue={cabin && cabin.name} id="name" disabled={isPending} {...register("name", {
          required: "This filed is required"
        })}/>
      </FormRow>

      <FormRow label="Maximum capacity" disabled={isPending} error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This filed is required",
          min: {value:1, message:"Capacity must be at least 1"}
        })}/>
      </FormRow>

      <FormRow label="Regular price" disabled={isPending} error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This filed is required",
          min: {value:0, message:"Price must be at least 0"}
        })}/>
      </FormRow>

      <FormRow label="Discount" disabled={isPending} error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: "This filed is required",
          validate: (value) => value <= getValues().regularPrice|| "Discount must less than regular price"
        })} />
      </FormRow>

      <FormRow label="Description" disabled={isPending} error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "This filed is required"
        })}/>
      </FormRow>

      <FormRow label="Cabin photo" disabled={isPending} error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image", {
          required: "This filed is required"
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button  variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
