import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { additem, resetStatus } from '../features/adminSlice'
import Inputfield from '../app/ui/Inputfield'
import Button from '../app/ui/Button'

const Addproducts = ({ onClose }) => {

    const { state, error, status } = useSelector((state) => state.admin)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const handleAdditems = () => {

        dispatch(additem({
            "title": title,
            "price": price,
            "image": image
        }))
        console.log('status', status)
        if (status == 'success') {
            setTitle('');
            setPrice('');
            setImage('');
        }
        // !error ?? onClose()

    }


    return (
        <>
            <div  >
                <form className='w-100 block' onSubmit={(e) => e.preventDefault()} >
                    <Inputfield placeholder='Title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Inputfield placeholder='Price' type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <Inputfield placeholder='Product Image URL' type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                    <Button onClick={() => handleAdditems()} children="Add" />
                </form>
                {error && <p className="text-red-500 text-sm mt-2">
                    {error}
                </p>
                }
                {status == 'Successfully Added' && <p className='color-green'>{status}</p>}
            </div>
        </>
    )
}

export default Addproducts





