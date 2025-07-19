

import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import CartCount from './CartCount'
import Logout from './Logout'


const Header = () => {

    return (

        <div className="Header-container">
            <a href="" className="logolink">
                <img src={logo} style={{ width: '100%', height: 'auto' }} alt="company logo" />
            </a>
            <div className="Header-right">
                <Link to="/">Products</Link>
                <a href="">Favourites</a>
                <a href="">About</a>
                <CartCount></CartCount>
                <Logout />
               
            </div>
        </div>

    )

}

export default Header