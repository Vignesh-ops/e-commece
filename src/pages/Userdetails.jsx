import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Inputfield from '../app/ui/Inputfield'
import placeholder from '../assets/place.jpeg'
import { uploadimage, reset } from '../features/authSlice'

const Userdetails = () => {

  const { user, status, error } = useSelector((state) => state.auth)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.name)
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  dispatch(reset())
  const handleimageup = (blob) => {
    const formData = new FormData();
    formData.append("image", blob);
    dispatch(uploadimage(formData))
  }

  return (
    <>
      <div className='flex flex-col justify-center' >
        <div className='p-2'>Userdetails</div>
        <Inputfield label='Name: ' type='text' value={name} />
        <Inputfield label='Email: ' type='text' value={email} />
        <div className='flex align-center justify-center h-[100px] pb-4'>
          <img className='h-full w-auto ' src={user.image || placeholder} alt='profile' />
        </div>
        <Inputfield label='Upload Profile: ' type='file' accept='image/*' onChange={(e) => handleimageup(e.target.files[0])} />
        {status == 'pending' && <p>Please wait . . .</p>}
        {status == 'success' && <p className='text-green-500'>Uploaded successfully</p>}
        {error && <p className='text-red-500'>{error} please upload valid image</p>}

      </div>
    </>
  )
}

export default Userdetails