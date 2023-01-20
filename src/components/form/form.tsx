import {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
} from "react";
import Button, { ButtonProps } from "components/button/button";
import FormInput, {
  FormInputProps,
} from "components/form/components/form-input/form-input";
import styles from "components/form/form.module.scss";

export type FormValues = {
  [key: string]: string;
};

export type FormProps = {
  formFields: FormInputProps[];
  buttons: ButtonProps[];
  onSubmit: (
    formValues: FormValues,
    setFormValues: Dispatch<SetStateAction<FormValues>>
  ) => void;
  formType: 'login' | 'register'
  testId?: string;
};

export default function Form({
  formFields,
  buttons,
  onSubmit,
  formType,
  testId,
}: FormProps) {
  const [formValues, setFormValues] = useState<FormValues>({});

  const handleChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) =>
      setFormValues({ ...formValues, [name]: value }),
    [formValues]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // check for required fields
      const requiredFields = formFields.filter((field) => field.required);
      const missingFields = requiredFields.filter(
        (field) => !formValues[field.name]
      );
      if (missingFields.length) return alert("Please fill in all fields");

      // check for valid email with regex
      const emailField = formFields.find((field) => field.type === "email");
      if (emailField && !formValues[emailField.name].match(/.+@.+\..+/))
        return alert("Please enter a valid email");

      // check for matching password
      if (
        formValues["confirmPassword"] &&
        formValues["password"] !== formValues["confirmPassword"]
      )
        return alert("Passwords do not match");

      onSubmit(formValues, setFormValues);
    },
    [formFields, formValues, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} data-testid={testId ?? "form"}>
      {formFields.map((formField) => {
        const completeField = {
          ...formField,
          onChange: handleChange,
          value: formValues[formField.name],
        };

        return <FormInput key={`${formType}-${formField.name}`} {...completeField} />;
      })}

      <div className={styles["buttons-container"]}>
        {buttons.map((button) => (
          <Button key={button.id} {...button} />
        ))}
      </div>
    </form>
  );
}
