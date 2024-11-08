import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/
// Here we will again use react hook form library here for error handling

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  //
  const { signup, isLoading: isLoadingSignup } = useSignup();

  function onSubmit({ fullName, email, password }) {
    console.log(fullName, email, password);
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoadingSignup}
          {...register("fullName", {
            required: "This field is required.",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoadingSignup}
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoadingSignup}
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password needs to be minimum of 8 characters.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoadingSignup}
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value) =>
              value === getValues().password || "Passwords needs to be matched",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoadingSignup}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoadingSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
