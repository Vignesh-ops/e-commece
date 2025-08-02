import { useEffect, useState } from "react";
import {api2} from '../services/api'

import { useCart } from "../context/cartContext";
import { useDispatch } from "react-redux";
import { addToCart, fetchCartData } from "../features/cartSlice";
import Button from "../app/ui/Button";
import Inputfield from '../app/ui/Inputfield'

const Home = () => {


    const [allproducts, setallProducts] = useState([])
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    // const { addToCart } = useCart()

    useEffect(() => {
        dispatch(fetchCartData())
        api2.get("products").then((res) => {
            setallProducts(res.data)
            setProducts(res.data)

        })
    }, [])

    const handlesearch = (searchitem) => {

        if (!searchitem) setProducts(allproducts);

        const filteritem = products.filter((product) => {
            return product.title.toLowerCase().includes(searchitem.toLowerCase())
        })
        if (searchitem) setProducts(filteritem);
    }

    const handlesort = (val) => {
        if (!val) return;
        const sortable = [...products]

        if (val === 'low to high') {
            sortable.sort((a, b) => {
                return a.price - b.price
            })
        }
        if (val === 'high to low') {
            console.log('insidehigh', val)
            sortable.sort((a, b) => {
                return b.price - a.price
            })
        }
        setProducts(sortable)

    }

    return (
        <>
            <div className="dflex gap-4 align-center mt-4">
                <Inputfield className="mt-4" placeholder='Search Products' type='search' onChange={(e) => handlesearch(e.target.value)} />

                <select  className="mb-4 border-1 border-radius-5" onChange={(e) => (handlesort(e.target.value))}>
                    <option className="bg-[#242424]" value=''>Sort by</option>
                    <option className="bg-[#242424]" value='low to high'>low to high</option>
                    <option className="bg-[#242424]" value='high to low'> high to low</option>

                </select>

            </div>
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
                        <div className="prod-container__buysection flex gap-1">
                            <Button className="text-sm" children='Buy Now' />
                            <Button className="text-sm" onClick={() => dispatch(addToCart(product))} children="Add to Cart" />
                        </div>
                    </div>
                )))}
            </div>
        </>

    )
}

export default Home;