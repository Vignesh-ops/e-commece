import { useEffect, useState } from "react";
import api from '../services/api'

import { useCart } from "../context/cartContext";
import { useDispatch } from "react-redux";
import { addToCart,fetchCartData } from "../features/cartSlice";

const Home = () => {


    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    // const { addToCart } = useCart()

    useEffect(() => {
        dispatch(fetchCartData())
        api.get("products").then((res) => {
            setProducts(res.data)
        })
    }, [])



    return (
        <div className="prod-container">
            {products.map((product => (
                <div key={product.id} className="prod-container__items">
                    <div className="prod-container__image">
                        <img src={product.image} />
                    </div>
                    <div className="prod-container__itemname">
                        {product.title}
                    </div>
                    <div className="prod-container__itemprice">
                        Price: ${product.price}
                    </div>
                    <div className="prod-container__buysection">
                        <button>Buy Now</button>
                        <button onClick={() => dispatch(addToCart(product))} >Add to Cart</button>
                    </div>
                </div>

            )))}

        </div>


    )
}

export default Home;