import React from 'react'

const Additem = ({user,onClose}) => {
    const [name, setName] = useState(user.name)
    const [price, setPrice] = useState(user.email)
    const [image, setImage] = useState(user.role)
    const [iserror, setError] = useState('')
    const dispatch = useDispatch()

    const { error, status } = useSelector((state) => state.admin)
    useEffect(() => {
        if (error) {
            setError(error)
        }
        console.log('status', status)

        if (status == 'success') {
            setTimeout(() => {
                dispatch(resetStatus())
                onClose()
            }, 1000)
        }

    }, [error, status])
    const handleitemEdit = (product) => {
        dispatch(editproducts({ ...product, title, price, image }))
    }
  return (
    <div>EditUser</div>
  )
}

export default Additem