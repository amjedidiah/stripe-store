import styles from "components/button/button.module.scss";
import classNames from "classnames";
import { InputHTMLAttributes, memo } from "react";

export enum BUTTON_TYPE_CLASSES {
  custom = "custom",
  google = "google-sign-in",
  inverted = "inverted",
}

export type ButtonProps = {
  loading?: boolean;
  buttonType?: keyof typeof BUTTON_TYPE_CLASSES;
  dataTestId?: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Button({
  buttonType = "custom",
  loading,
  value,
  className,
  type = "button",
  onChange = () => {},
  ...otherProps
}: ButtonProps) {
  return (
    <div className={styles["button-wrapper"]}>
      <input
        className={classNames(
          styles["button-container"],
          styles[BUTTON_TYPE_CLASSES[buttonType]],
          className
        )}
        disabled={loading}
        value={loading ? "" : value}
        type={type}
        onChange={onChange}
        data-testid={otherProps["dataTestId"] ?? buttonType}
        {...otherProps}
      />
      {loading && (
        <div
          className={styles.spinner}
          role="alert"
          aria-busy="true"
          aria-label="loading..."
        />
      )}
    </div>
  );
}

export default memo(Button);
