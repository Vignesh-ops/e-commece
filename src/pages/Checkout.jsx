
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCartData, clearCartitems } from "../features/cartSlice"
import { useNavigate } from "react-router-dom";


export const Checkout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCartData())
    }, [dispatch])

    const [purchased, setPurchased] = useState(false)

    const navigate = useNavigate()
    const { items } = useSelector((state) => state.cart)

    const handlepurchase = () => {
        dispatch(clearCartitems(items))
        setPurchased(true)
        setTimeout(() => {
            navigate('/')
        }, 1500)
    }

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return (

        <div className="checkout__container">
            {!purchased && items.map((item) => (
                <ul style={{ listStyleType: 'none' }} key={item.id} >
                    <img src={item.image} style={{ width: '150px' }} />
                    <li>Name:{item.title}</li>
                    <li>Quantity:{item.quantity}</li>
                    <li>Total:{item.quantity * item.price}</li>
                </ul>
            ))}
            {purchased && <><h4>Successfully Purchased</h4>
                <h2>Thank You!!</h2></>}
            {!purchased && <div className="login__auth">
                <div>Amount for total items: {totalAmount} </div>
                <button onClick={() => handlepurchase()}>Place Order</button>
            </div>}

        </div>




    )

}



export default Checkout;