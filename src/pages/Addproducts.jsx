import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { additem, resetStatus } from '../features/adminSlice'
import Inputfield from '../app/ui/Inputfield'
import Button from '../app/ui/Button'
import { useForm, useFieldArray } from 'react-hook-form'

const Addproducts = ({ onClose }) => {

    const { state, error, status } = useSelector((state) => state.admin)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm({
        defaultValues: {
            title: '',
            price: '',
            image: '',
            specifications: [{ name: '', value: '' }]
        }
    })

    // For dynamic specification fields
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'specifications'

    })
    const onSubmit = (data) => { 
        console.log(data)
        dispatch(additem({
            "title": data.title,
            "price": data.price,
            "image": data.image,
            specifications: data.specifications
        }))
        console.log('status', status)
        if (status == 'Successfully Added') {
           
        }
        // !error ?? onClose()

    }


    return (
        <>
            <div  >
                <form className='w-100 block' onSubmit={handleSubmit(onSubmit)} >
                    <Inputfield placeholder='Title' type="text"
                        {...register('title', {
                            required: 'Title is requires',
                            minLength: {
                                value: 4,
                                message: 'Atleast character must be required'
                            }
                        })}
                    />
                    {errors.title && <p>{errors.title.message}</p>}
                    <Inputfield placeholder='Price' type="number"
                        {...register('price', {
                            required: 'Title is requires',
                            pattern: {
                                value: /^[0-9]+$/i,
                                message: 'Must be a number'
                            }
                        })}
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                    <Inputfield placeholder='Product Image URL' type="text"
                        {...register('image', {
                            required: 'Image URL is required',

                        })}
                    />
                    {errors.image && <p>{errors.image.message}</p>}

                    {/* Dynamic form section */}
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2">
                            <Inputfield placeholder='Specification Name' type="text"
                                {...register(`specifications.${index}.name`, {
                                    required: 'This field is required',

                                })}
                            />
                            <Inputfield placeholder='Specification Value' type="text"
                                {...register(`specifications.${index}.value`, {
                                    required: 'This field is required',

                                })}
                            />
                            {fields.length > 1 &&
                                <Button type='button' onClick={() => remove(index)} children="Remove" />
                            }

                        </div>
                    ))}
                    <Button type='button' onClick={() => append({ name: '', value: '' })} children="Add More" />
                    <Button type='submit' disabled={isSubmitting} children="Submit" />
                    <Button type='button' onClick={() => reset()} children="Reset" />

                </form>
                {error && <p className="text-red-500 text-sm mt-2">
                    {error}
                </p>
                }
                {status == 'Successfully Added' && <p className='text-green-500'>{status}</p>}
            </div>
        </>
    )
}

export default Addproducts





