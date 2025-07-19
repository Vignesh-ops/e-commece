import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from '../features/authSlice'
import { useNavigate, Link } from "react-router-dom"
const Login = () => {

  const { user, stauts, error } = useSelector((state) => state.auth)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handlelogin = () => {
    dispatch(login({ email, password }))
  }


  return (
    <div className="login__container">

      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="login__email" autoComplete="email" />
      <input type="password" autoComplete="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="login__pass" />
      <div className="login__auth">
        <button onClick={() => handlelogin()}>Login</button>
        <button><Link to='/register'>Register</Link></button>
      </div>
    </div>
  )
}

export default Login;