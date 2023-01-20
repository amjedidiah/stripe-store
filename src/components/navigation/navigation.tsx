import { Fragment, SyntheticEvent, useCallback, useMemo } from "react";
import { Link, LinkProps, NavLink, Outlet } from "react-router-dom";
import styles from "components/navigation/navigation.module.scss";
import { ReactComponent as CrwnLogo } from "assets/crown.svg";
import CartIcon from "routes/components/shop/components/cart/components/cart-icon/cart-icon";
import CartDropdown from "routes/components/shop/components/cart/components/cart-dropdown/cart-dropdown";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectCurrentUser, logoutPending } from "redux/slices/user.slice";

const pages = [
  {
    to: "/shop",
    children: "SHOP",
    id: "shop-link",
  },
] as LinkProps[];

export default function Navigation() {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = useCallback((e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logoutPending());
    // Disabled because dispatch is never updated throughout the React app lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatedPages = useMemo(() => {
    pages[1] = currentUser
      ? {
          to: "",
          children: "LOGOUT",
          onClick: handleLogout,
          id: "logout-link",
        }
      : {
          to: "/auth",
          children: "LOGIN",
          id: "login-link",
        };
    return pages as LinkProps[];
  }, [currentUser, handleLogout]);

  const renderUpdatedPages = useCallback(() => {
    return updatedPages.map((page) =>
      page.to ? (
        <NavLink
          className={styles["nav-link"]}
          key={page.id}
          {...page}
        />
      ) : (
        <span className={styles["nav-link"]} key={`span-${page.id}`} {...page} />
      )
    );
  }, [updatedPages]);

  return (
    <Fragment>
      <div className={styles.navigation}>
        <Link className={styles["logo-container"]} to="/">
          <CrwnLogo className={styles.logo} />
        </Link>
        <div className={styles["nav-links-container"]}>
          {renderUpdatedPages()}
          <CartIcon />
        </div>
        <CartDropdown />
      </div>
      <Outlet />
    </Fragment>
  );
}
