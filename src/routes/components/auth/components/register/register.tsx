import Form, { FormValues } from "components/form/form";
import styles from "routes/components/auth/auth.module.scss";
import { emailRegisterPending } from "redux/slices/user.slice";
import { useAppDispatch } from "redux/hooks";
import { Dispatch, SetStateAction, useCallback } from "react";
import { ButtonProps } from "components/button/button";
import { Label } from "components/form/components/form-input/form-input";

const formFields = [
  {
    name: "displayName",
    label: {
      value: "Display Name",
      id: "register-display-name",
    } as Label,
    type: "text",
    placeholder: "e.g: John Doe",
    required: true,
  },
  {
    name: "email",
    label: {
      value: "Email",
      id: "register-email",
    } as Label,
    type: "email",
    placeholder: "e.g: john.doe@example.com",
    required: true,
  },
  {
    name: "password",
    label: {
      value: "Password",
      id: "register-password",
    } as Label,
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: {
      value: "Confirm Password",
      id: "register-confirm-password",
    } as Label,
    type: "password",
    placeholder: "Confirm your password",
    required: true,
  },
];

const buttons = [
  {
    id: "submit-button-register",
    type: "submit",
    value: "Register",
  },
] as ButtonProps[];

export default function Register() {
  const dispatch = useAppDispatch();
  const handleRegister = useCallback(
    async (
      { displayName, email, password }: FormValues,
      setFormValues: Dispatch<SetStateAction<FormValues>>
    ) => {
      dispatch(emailRegisterPending({ displayName, email, password }));
      setFormValues({});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={styles["auth-child-container"]}>
      <h2>Don't Have An Account?</h2>
      <span>Register with your email and password</span>

      <Form
        formFields={formFields}
        buttons={buttons}
        onSubmit={handleRegister}
        formType="register"
        testId="register-form"
      />
    </div>
  );
}
