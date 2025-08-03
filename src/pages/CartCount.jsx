

import { Link } from "react-router-dom";
import cartlgo from '../assets/shopping-cart.png'
import { useSelector } from "react-redux";

const CartCount = () => {

    const { items } = useSelector((state) => state.cart)
    const count = items.length
    return (
        <Link to='/cart'>
            <div className='flex flex-col align-center justify-center'>
                <div className='flex align-center justify-center h-[40px]'>
                    <img src={cartlgo} className='h-full w-auto ' />
                </div>
                <p>Cart:{count}</p>
            </div>
        </Link>

    )

}

export default CartCount;