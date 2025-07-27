import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { register } from '../features/authSlice'
import Inputfield from "../app/ui/Inputfield"
import Button from "../app/ui/Button"


const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')
    const [iserror, setisError] = useState('')
    const { error, isregistered } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isregistered) {
            navigate('/login')
        }
        if (error) {
            setisError(error)
        }
    }, [isregistered, error])

    useEffect(() => {

        setisError('')

    }, [name, email, password, confirmpassword])

    const handleRegister = () => {

        if (password !== confirmpassword) {
            setisError('Please re-enter same password')
            return
        }

        dispatch(register({
            "name": name,
            "email": email,
            "password": password,
        }))

    }

    return (
        <div className="register__cont" >
            <h2 className="m-2 text-lg">Welcome to E-shop</h2>

            <Inputfield type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="text" />
            <Inputfield type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <Inputfield type="password" autoComplete="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Inputfield type="password" autoComplete="password" placeholder="Enter your password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
            {iserror && <p className="text-red-500 text-sm mt-2">{iserror}</p>}
            <Button onClick={() => handleRegister()} children="Register" />
        </div>
    )

}


export default Register