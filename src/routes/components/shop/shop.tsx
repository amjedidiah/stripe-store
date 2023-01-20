import { useEffect, useMemo, useState } from "react";
import styles from "routes/components/shop/shop.module.scss";
import CategoryPreview from "routes/components/shop/components/category-preview/category-preview";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  selectCategoryLoading,
  selectCategoryMap,
  fetchCategories,
} from "redux/slices/category.slice";
import Spinner from "components/spinner/spinner";

export default function Shop() {
  const categoryMap = useAppSelector(selectCategoryMap);
  const categoryIsLoading = useAppSelector(selectCategoryLoading);
  const [shouldSlice, setShouldSlice] = useState(false);
  const dispatch = useAppDispatch();
  const params = useParams();
  const category = params["*"]?.split("/")[0];

  useEffect(() => {
    dispatch(fetchCategories());

    /* Ought To Be Called One Time On The Backend */
    // const addCollection = async () => {
    //   await addCollectionAndDocuments('categories', PRODUCTS);
    // }
    // addCollection();

    // Disabled because dispatch is never updated throughout the React app lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categoryKeys = useMemo(() => {
    if (category) {
      if (categoryMap[category]) {
        setShouldSlice(false);
        return [category];
      }
      return [];
    } else {
      setShouldSlice(true);
      return Object.keys(categoryMap);
    }
  }, [category, categoryMap]);

  if (categoryIsLoading) {
    return <Spinner />;
  }

  if (categoryMap && !categoryKeys.length && category) {
    return <h2>No products for category {category}</h2>;
  }

  return (
    <div className={styles["shop-container"]}>
      {categoryKeys.map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          items={categoryMap[title]}
          shouldSlice={shouldSlice}
        />
      ))}
    </div>
  );
}
