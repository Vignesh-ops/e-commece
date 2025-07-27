import React, { useEffect, useRef, useState } from 'react'
import { fetchUsers, fetchProducts, edituser } from '../features/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import EditProduct from './EditProduct'

const Manageitems = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchUsers())
    }, [dispatch])

    const { products, users } = useSelector((state) => state.admin)

    const [selectedproduct, setSelectedProduct] = useState(null)
    const [handleuseredit, setHandleuseredit] = useState(null)
    const [selectedcp, setSelectedcp] = useState('editproducts')
    const [editrole, setEditroles] = useState({})
    const debounceref = useRef(null)

    const handleProductEdit = (product) => {
        setSelectedProduct(product)
    }
    const handleUserEdit = (user, role) => {

        setEditroles(prev => (
            {
                ...prev,
                [user.id]: role
            }
        ))

        if (debounceref.current) {
            clearTimeout(debounceref.current);
            console.log('inside clear',editrole)
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

            <select onChange={(e) => (setSelectedtab(e.target.value))}>
                <option value='editproducts'>Edit Products</option>
                <option value='addproducts'>Add Products</option>
                <option value='editusers'>Edit Users</option>
            </select>

            <div className='manage-items__container dflex'>
                {!selectedproduct && selectedcp == 'editproducts' && products.map((product) => (
                    <ul key={product.id}>
                        <div className="prod-container__image">
                            <img src={product.image} />
                        </div>
                        <div >{product.title}</div>
                        <button onClick={() => handleProductEdit(product)} type='submit'>Edit</button>
                    </ul>
                ))}
                {selectedproduct && <EditProduct onClose={() => setSelectedProduct(null)} product={selectedproduct} />}
                {!handleuseredit && selectedcp == 'editusers' && users.map((user) => (
                    <ul key={user.id}>
                        <div>Name:{user.name}</div>
                        <div>Email:{user.email}</div>
                        <label>Role:</label><input type='text' value={editrole[user.id] ?? user.role} onChange={(e) => (handleUserEdit(user, e.target.value))} />
                        <p style={{ color: 'green' }}></p>
                    </ul>
                ))}
                {handleuseredit && <EditProduct onClose={() => setHandleuseredit(null)} user={handleuseredit} />}
            </div >


        </>
    )
}

export default Manageitems