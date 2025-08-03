

import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import CartCount from './CartCount'
import React, { Suspense } from 'react'
import Logout from './Logout'
import { useSelector } from 'react-redux'
import placeholder from '../assets/place.jpeg'


const Header = () => {
    const { user } = useSelector((state) => state.auth)

    return (

        <div className="Header-container">
            <a href="" className="logolink">
                <img src={logo} style={{ width: '100%', height: 'auto' }} alt="company logo" />
            </a>
            <div className="Header-left">
                <Link to="/">Products</Link>
                {user?.role == 'admin' && <Link to='/admin/products'>Manage items</Link>}

                <a href="">About</a>


            </div>
            <div className='Header-right'>
                <CartCount></CartCount>
                {user && <Link to='./userdetails'>
                    <div className='flex flex-col align-center justify-center'>
                        <div className='flex align-center overflow-[hidden] justify-center  h-[40px]'>
                            <img className='h-full w-auto rounded-full' src={user.image || placeholder} alt='profile' />
                        </div>
                        <p>{user.name}</p>
                    </div>
                </Link>}
                <Logout />

            </div>
        </div>

    )

}

export default Header