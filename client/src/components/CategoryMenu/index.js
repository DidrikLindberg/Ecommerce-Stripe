import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories, currentCategory } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleCategoryClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  const handleShowAllClick = () => {
    // Set the current category to null to show all products
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: null,
    });
  };

  return (
    <div>
      <h2>Categories</h2>
      <button
        key="showAll"
        onClick={() => {
          handleShowAllClick();
        }}
        // Add a CSS class to style the "Show All" button
        className={`btn ${currentCategory === null ? 'btn-primary' : 'btn-light'}`}
      >
        Show All
      </button>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleCategoryClick(item._id);
          }}
          // Highlight the selected category button
          className={`btn ${currentCategory === item._id ? 'btn-primary' : 'btn-light'}`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
