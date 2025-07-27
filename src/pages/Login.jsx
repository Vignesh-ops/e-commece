import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from '../features/authSlice'
import { useNavigate, Link } from "react-router-dom"
import Inputfield from "../app/ui/Inputfield"
import Button from "../app/ui/Button"
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
      <h2 className="m-2">Welcome to E-shop</h2>
      <Inputfield type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      <Inputfield type="password" autoComplete="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="flex gap-4">
        <Button onClick={() => handlelogin()} children="Login"/>
        <Button children={<Link to='/register'>Register</Link>} />
      </div>
    </div>
  )
}

export default Login;