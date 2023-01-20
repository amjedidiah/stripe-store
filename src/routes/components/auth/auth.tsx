import styles from "./auth.module.scss";
import Register from "routes/components/auth/components/register/register";
import Login from "routes/components/auth/components/login/login";
import { selectCurrentUser } from "redux/slices/user.slice";
import { useAppSelector } from "redux/hooks";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const currentUser = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  if (currentUser) {
    navigate("/");
    return null;
  }

  return (
    <div className={styles["auth-container"]}>
      <Login />
      <Register />
    </div>
  );
}
