

import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import cartlgo from '../assets/shopping-cart.png'
import { fetchCartData } from "../features/cartSlice";
import { useSelector } from "react-redux";

const CartCount = () => {

    const {items} = useSelector((state)=>state.cart)
    const count = items.length
    console.log(items)
    return (
        <Link to='/cart'> <span><img src={cartlgo} style={{ width: '100%', height: 'auto' }} />Cart:{count}</span>
        </Link>
    )

}

export default CartCount;