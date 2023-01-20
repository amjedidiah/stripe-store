import styles from "components/spinner/spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles["spinner-overlay"]}>
      <div className={styles["spinner-container"]} />
    </div>
  );
}
