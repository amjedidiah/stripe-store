import { useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { authenticateUserPending } from "redux/slices/user.slice";
import AppRoutes from "routes/routes";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticateUserPending());
    // Disabled because dispatch is never updated throughout the React app lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppRoutes />;
}
