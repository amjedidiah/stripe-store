import styles from "components/form/components/form-input/form-input.module.scss";
import classNames from "classnames";
import { memo, InputHTMLAttributes } from "react";

export type Label = {
  value: string;
  id: string;
};

export type FormInputProps = {
  label?: Label;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function FormInput({
  label,
  value = "",
  onChange = () => {},
  type = "text",
  ...otherProps
}: FormInputProps) {
  if (otherProps.name === '') return null;

  return (
    <div className={styles.group}>
      <input
        className={styles["form-input"]}
        value={value}
        onChange={onChange}
        type={type}
        aria-labelledby={label?.id}
        {...otherProps}
      />
      {label && (
        <label
          id={label.id}
          className={classNames(styles["form-input-label"], {
            [styles.shrink]: Boolean(value && value.toString().length),
          })}
          data-testid="form-input-label"
        >
          {label.value}
        </label>
      )}
    </div>
  );
}

export default memo(FormInput);