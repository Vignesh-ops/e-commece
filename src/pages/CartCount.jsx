

import { Link } from "react-router-dom";
import cartlgo from '../assets/shopping-cart.png'
import { useSelector } from "react-redux";

const CartCount = () => {

    const {items} = useSelector((state)=>state.cart)
    const count = items.length
    return (

        <Link to='/cart'> <div className="h-10 w-10"><img src={cartlgo} style={{ width: '100%', height: 'auto' }} />Cart:{count}</div>
        </Link>
    )

}

export default CartCount;