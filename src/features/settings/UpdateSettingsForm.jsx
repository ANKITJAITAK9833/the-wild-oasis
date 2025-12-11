import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const {isLoading, settings: {minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice} = {}} = useSettings();
  const {register} = useForm();
  const {isUpdating, updateSetting} = useUpdateSetting();
  function handleUpdate(e, field){
    const { value} = e.target;
    if(!value) return;
    updateSetting({[field]: value});
  }
if(isLoading || isUpdating) return <Spinner/>
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating}  onBlur={(e)=> handleUpdate(e, 'minBookingLength')} {...register("min-nights", {
          required: "This field is required",
          min: {value:1, message:"Minimum nights must be at least 1"}
        })} defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdating}  onBlur={(e)=> handleUpdate(e, 'maxBookingLength')} defaultValue={maxBookingLength}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdating}  onBlur={(e)=> handleUpdate(e, 'maxGuestsPerBooking')} defaultValue={maxGuestsPerBooking} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating}  onBlur={(e)=> handleUpdate(e, 'breakfastPrice')}  defaultValue={breakfastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
