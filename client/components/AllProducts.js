import React, {useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/allProducts" 


const AllProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => {
        return state.allProducts
    })

    useEffect(()=> {
        dispatch(fetchAllProducts())
    }, [])

    console.log(products.map((product)=> product.title))

    return (
        <div>
            {products.map((product)=>
                <div>
                <h3>{product.title}</h3>
                <h3>${product.price}</h3>
                <img src={product.imageUrl} />
                </div>
            )}
        </div>
    )
}

export default AllProducts;
