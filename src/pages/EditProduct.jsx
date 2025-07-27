import React, { useEffect, useState } from 'react'
import { editproducts, resetStatus } from '../features/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import Inputfield from '../app/ui/Inputfield'
import Button from '../app/ui/Button'

const EditProduct = ({ product, onClose }) => {
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [image, setImage] = useState(product.image)
    const [iserror, setError] = useState('')
    const dispatch = useDispatch()

    const { error, status } = useSelector((state) => state.admin)
    useEffect(() => {
        if (error) {
            setError(error)
        }
        console.log('status', status)

        if (status == 'success') {
            setTimeout(() => {
                dispatch(resetStatus())
                onClose()
            }, 1000)
        }

    }, [error, status])
    const handleitemEdit = (product) => {
        dispatch(editproducts({ ...product, title, price, image }))
    }


    return (
        <>
            <div>EditProduct</div>
            <form key={product.id} onSubmit={(e) => e.preventDefault()} method='' action=''>
                <Inputfield type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter a product name' />
                <Inputfield type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter a price' />
                <Inputfield type='text' value={image} onChange={(e) => setImage(e.target.value)} placeholder='Enter a image URL' />
                <Button onClick={() => handleitemEdit(product)} children='submit' />
            </form>
            {status == 'success' && <p>Updated Successfully</p>}
            {iserror && <p>{iserror}</p>}

        </>
    )
}

export default EditProduct