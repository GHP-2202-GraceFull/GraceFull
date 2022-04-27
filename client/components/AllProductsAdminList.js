import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { MdOutlineExpandMore } from "react-icons/md";

const AllProductsAdminList = ({ product, changeProductForm }) => {
  return (
    <>
      <Accordion id="products-accordion">
        <AccordionSummary expandIcon={<MdOutlineExpandMore />}>
          <span className={product.stock ? "" : "red"}>{product.title}</span>
        </AccordionSummary>
        <AccordionDetails>
          <div id="accordion-image">
            <img src={product.imageUrl} />
          </div>
          <div id="accordion-text">
            <div>{product.description}</div>
            <div>
              <strong>Stock:</strong> {product.stock}
            </div>
            <div>
              <strong>Price:</strong> {product.price}
            </div>
            <div>
              <strong>Categories: </strong>
              {product.categories
                .map((category) => `${category.name}`)
                .join(", ")}
            </div>
            <button
              type="button"
              onClick={() => changeProductForm("edit", product)}
            >
              Edit Product
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AllProductsAdminList;
