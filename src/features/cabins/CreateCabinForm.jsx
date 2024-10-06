/* eslint-disable */

import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSesstion = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState /* This function is used to get values from the input fields */,
  } =
    // We can also pass some options in the useForm hook
    useForm({
      defaultValues: isEditSesstion ? editValues : {},
    });

  // We can get the error of the form using the formState hook
  const { errors } = formState;

  function onSubmit(data) {
    // data from all the fields that we register
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSesstion)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          // This callback function also get access to the data that the mutation function returns.
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          // This callback function also get access to the data that the mutation function returns.

          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      // Handle submit is called each time when the form is submitted.
      // Here the validation of the form occurs.
      // In case of any error in the validations, handleSubmit will not call the onSubmit function.
      // Insted it will call the second function
      onSubmit={handleSubmit(
        onSubmit,
        onError
        /* It is this function that react hook form will call whenever the form is submitted */
      )}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          // name => It is the name of the field
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          {...register("regular_price", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            // We can write our own custom validation functions
            // The function will get the value as an argument.
            // Value argument is the current value that the input field has
            validate: (value) =>
              // getValues will allow us to get values form all the input fields
              +value <= +getValues().regular_price ||
              "Discount should be less than regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required.",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSesstion ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={
            () => onCloseModal?.()
            /* Here if onCloseModal is undefined then it will not be called */
          }
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSesstion ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
