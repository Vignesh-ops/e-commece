import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Logout = () => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <span style={{ padding: "0.8rem" }}><button onClick={() => dispatch(logout())}>Logout</button></span>

  )
}

export default Logout