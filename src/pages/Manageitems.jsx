import React, { useEffect, useRef, useState } from 'react'
import { fetchUsers, fetchProducts, edituser, removeProduct } from '../features/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import EditProduct from './EditProduct'
import Addproducts from './Addproducts'
import Button from '../app/ui/Button'
import Inputfield from '../app/ui/Inputfield'

const Manageitems = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchUsers())
    }, [dispatch])

    const { products, users, error, status } = useSelector((state) => state.admin)

    const [selectedproduct, setSelectedProduct] = useState(null)

    const [selectedcp, setSelectedcp] = useState('editproducts')
    const [editrole, setEditroles] = useState({})
    const debounceref = useRef(null)


    const handleUserEdit = (user, role) => {

        setEditroles(prev => (
            {
                ...prev,
                [user.id]: role
            }
        ))

        if (debounceref.current) {
            clearTimeout(debounceref.current);
        }

        debounceref.current = setTimeout(() => {
            console.log('inside debounce', role, user)
            dispatch(edituser({
                ...user, role
            }))
        }, 1000)
        // setHandleuseredit(user)
    }
    const setSelectedtab = (value) => {
        setSelectedcp(value)
    }

    return (
        <>
            <h4>Control panel</h4>

            <select className="appearance-none m-2 px-4 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => (setSelectedtab(e.target.value))}>
                <option className='text-black' value='editproducts'>Edit Products</option>
                <option className='text-black' value='addproducts'>Add Products</option>
                <option className='text-black' value='editusers'>Edit Users</option>
            </select>
            <div className='grid grid-cols-4 gap-4'>
                {!selectedproduct && selectedcp == 'editproducts' &&

                    products.map((product) => (

                        <ul key={product.id}>
                            <div className="h-[200px] w-full overflow-hidden">
                                <img
                                    className="h-full w-full object-contain"
                                    src={product.image}
                                    alt={product.title}
                                />
                            </div>
                            <div >{product.title}</div>
                            <div className='flex gap-2 w-full justify-center'>
                                <Button className='pl-4' onClick={() => setSelectedProduct(product)} type='submit' children="Edit" />
                                <Button className='pl-4' onClick={() => dispatch(removeProduct(product.id))} type='submit' children="Delete" />
                            </div>
                        </ul>

                    ))}
            </div >
            {selectedproduct && <EditProduct onClose={() => setSelectedProduct(null)} product={selectedproduct} />}
            <div className='w-full flex justify-center align-center flex-column gap-6'>
                {selectedcp == 'editusers' && users.map((user) => (
                    <div key={user.id}>
                        <div className='text-left'>Name:{user.name}</div>
                        <div className='text-left'>Email:{user.email}</div>
                       <Inputfield type='text' label='Role:' value={editrole[user.id] ?? user.role} onChange={(e) => (handleUserEdit(user, e.target.value))} />
                        <p style={{ color: 'green' }}></p>
                    </div>
                ))}
            </div >

            {selectedcp == 'addproducts' && <Addproducts />
            }
            {
                error && <p className="text-red-500 text-sm mt-2">
                    ❌ Invalid email address
                </p>
            }
            {status == "success" && <p className="text-green-500 text-sm mt-2">Item has been removed</p>}
        </>
    )
}

export default Manageitems