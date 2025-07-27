
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCartData, clearCartitems } from "../features/cartSlice"
import { useNavigate } from "react-router-dom";
import Button from "../app/ui/Button";


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
        <>
            <div className="flex flex-col justify-center align-center p-4">
                {!purchased && items.map((item) => (
                    <div key={item.id}>

                        <div className="flex justify-center" key={item.id} >
                            <div className="w-6- h-60">
                                <img src={item.image} className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div>Name:{item.title}</div>
                        <div>Quantity:{item.quantity}</div>
                        <div>Total:{item.quantity * item.price}</div>
                    </div>
                ))}
                {purchased && <><h4>Successfully Purchased</h4>
                    <h2>Thank You!!</h2></>}
                {!purchased && <div className="login__auth">
                    <div>Amount for total items: {totalAmount} </div>
                    <Button onClick={() => handlepurchase()} children='Place Order' />
                </div>}

            </div>


        </>

    )

}



export default Checkout;