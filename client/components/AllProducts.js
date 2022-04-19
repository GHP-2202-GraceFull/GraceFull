import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/allProducts" 


const AllProducts = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => {
        return state.products
    })

    useEffect(()=> {
        dispatch(fetchAllProducts())
    }, [])

    return (
        <div>
            <h1>All Products</h1>
            <div>
                {products.map((product) =>{
                    <div key={product.id}>
                        <image scr={product.image} />
                        <h3>{product.name}</h3>
                        <h3>{product.price}</h3>
                    </div>
                })}
            </div>
        </div>
    )
}


export default AllProducts;

// const mapState = (state) => {
//     return {
//         products: state.products
//     }
// }

// const mapDispatch = (dispatch) => {
//     return {
//         loadProduct: () =>dispatch(fetchProducts())
//     }
// }

// export default connect (null, mapDispatch)(AllProducts)