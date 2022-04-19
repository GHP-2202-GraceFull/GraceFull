import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/allProducts" 


const AllProducts = () => {
    const [sort, setSort] = useState(null);
    const dispatch = useDispatch();
    const products = useSelector((state) => {
        return state.allProducts
    })

    useEffect(()=> {
        dispatch(fetchAllProducts())
    }, [])

    if(sort) products.sort((a,b)=> a.price-b.price)

    return (
        <div>
            <button onClick={()=> setSort(true)}>Sort: low to high</button>
            {products.map((product)=>
                <div key={product.id}>
                <h3>{product.title}</h3>
                <h3>${product.price}</h3>
                <img src={product.imageUrl} />
                </div>
            )}
        </div>
    )
}

export default AllProducts;
