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
            <div>Stock: {product.stock}</div>
            <div>Price: {product.price}</div>
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
