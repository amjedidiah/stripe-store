import {memo} from "react";
import { Category as CategoryType } from "redux/redux.types";
import styles from  "routes/components/home/components/categories/components/category/category.module.scss";
import { useNavigateToCategory } from "routes/hooks/shop.hook";

type CategoryProps = {
  imageUrl: string;
} & CategoryType;

export function Category({ imageUrl, title }: CategoryProps) {
  const navigateToCategory = useNavigateToCategory(title, true);

  return (
    <div className={styles["category-container"]} onClick={navigateToCategory}>
      <div
        className={styles["background-image"]}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className={styles["category-body-container"]}>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default memo(Category);