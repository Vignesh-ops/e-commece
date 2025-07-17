


const Footer = () =>{


    return(
        <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    )
}

export default Footer;