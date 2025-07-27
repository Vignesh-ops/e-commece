

import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import { fetchCartData,increaseQuantity,decreaseQuantity,removeFromCart } from "../features/cartSlice";
import { useEffect } from "react";
import Button from "../app/ui/Button";

const Cart = () => {
    // const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart()
    const {items,status} = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchCartData())
    },[dispatch])

    return (
        <div className="Cart-container">
            {status === 'loading' && <p>Loading...</p>}
            {items?.length > 0 ? (items.map((item => (

                <div key={item.id} className="prod-container__items">
                    <div className="prod-container__image">
                        <img src={item.image} />
                    </div>
                    <div className="prod-container__itemname">
                        {item.title}
                    </div>
                    <div className="prod-container__itemprice">
                        Price: ${item.price * item.quantity}
                    </div>
                    <div className="prod-container__itemprice">
                        Quantity: {item.quantity}
                    </div>
                    <div className="prod-container__buysection">
                        <Button onClick={() => dispatch(increaseQuantity(item))} children={'+'}/>
                        <Button onClick={() => dispatch(decreaseQuantity(item))} children='-'/>
                        <Button onClick={() => dispatch(removeFromCart(item.id))} children='Remove'/>
                    </div>
                </div>

            )))) : (
                <>
                <p>No items available.</p>
                <Link to='/'><p>Explore items</p></Link>
                </>
            )}

            {items?.length > 0 &&
            <Link to='/checkout'><Button children='Checkout' /></Link>
            }

        </div>

    )


}


export default Cart;