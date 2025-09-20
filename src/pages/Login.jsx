import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from '../features/authSlice'
import { useNavigate, Link } from "react-router-dom"
import Inputfield from "../app/ui/Inputfield"
import Button from "../app/ui/Button"
import { useForm } from "react-hook-form"
const Login = () => {

  const { user, status, error } = useSelector((state) => state.auth)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    console.log('data', data)
    dispatch(login({ email, password }))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login__container">
      <h2 className="m-2">Welcome to E-shop</h2>
      <Inputfield type="email" placeholder="Enter your email"
        {...register('email', {
          required: 'Email is required', pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Min length must be greater than 5'
          }
        })}
        autoComplete="email" />
      {errors.email && <p>{errors.email.message}</p>}


      <Inputfield type="password" autoComplete="password" placeholder="Enter your password"

        {...register('password', {
          required: 'password must required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <div className="flex gap-4">
        <Button type="submit" children="Login" />
        <Button children={<Link to='/register'>Register</Link>} />
      </div>
    </form>
  )
}

export default Login;