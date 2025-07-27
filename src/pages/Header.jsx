

import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import CartCount from './CartCount'
import Logout from './Logout'
import { useSelector } from 'react-redux'


const Header = () => {
    const { user } = useSelector((state) => state.auth)

    return (

        <div className="Header-container">
            <a href="" className="logolink">
                <img src={logo} style={{ width: '100%', height: 'auto' }} alt="company logo" />
            </a>
            <div className="Header-left">
                <Link to="/">Products</Link>
                <a href="">Favourites</a>
                <a href="">About</a>


            </div>
            <div className='Header-right'>
                <CartCount></CartCount>
                <Logout />
                {user?.role == 'admin' && <Link to='/admin/products'>Manage items</Link>}

            </div>
        </div>

    )

}

export default Header