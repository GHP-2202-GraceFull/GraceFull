import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../store/categories";
import { Chip } from "@material-ui/core";
import { AiOutlinePlusCircle } from "react-icons/ai";

const AddCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const categories = useSelector((state) => state.categories);
  return (
    <div id="category-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log("submit new category clicked");
        }}
      >
        <div id="add-header">
          <h2>Add a New Category</h2>
          <button type="submit">
            <AiOutlinePlusCircle size={30} />
          </button>
        </div>
        <label htmlFor="name">Category Name:</label>
        <input name="name" type="text" className="product-input"></input>
      </form>
      <div id="category-chips">
        {categories.map((category) => (
          <Chip
            key={category.id}
            onDelete={() => console.log("clicked delete")}
            label={
              category.name.charAt(0).toUpperCase() + category.name.slice(1)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
