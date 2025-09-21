import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { editproducts, resetStatus } from '../features/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import Inputfield from '../app/ui/Inputfield'
import Button from '../app/ui/Button'

const EditProduct = ({ product, onClose }) => {
  const dispatch = useDispatch()
  const { error, status } = useSelector((state) => state.admin)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm({
    defaultValues: {
      title: product.title || '',
      price: product.price || '',
      image: product.image || '',
      specifications: product.specifications || [{ name: '', value: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications"
  })

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        dispatch(resetStatus())
        onClose()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [status, dispatch, onClose])

  const onSubmit = async (data) => {
    try {
      const filteredSpecs = data.specifications.filter(
        spec => spec.name.trim() !== '' && spec.value.trim() !== ''
      )

      const updatedProduct = {
        ...product,
        title: data.title,
        price: data.price,
        image: data.image,
        specifications: filteredSpecs
      }

      await dispatch(editproducts(updatedProduct))
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  return (
    <div>
      <h2>Edit Product</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Product Fields */}
        <div>
          <Inputfield
            type="text"
            placeholder="Enter product name"
            {...register('title', {
              required: 'Product name is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters'
              }
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Inputfield
            type="number"
            step="0.01"
            placeholder="Enter price"
            {...register('price', {
              required: 'Price is required',
              min: {
                value: 0.01,
                message: 'Price must be greater than 0'
              }
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Inputfield
            type="url"
            placeholder="Enter image URL"
            {...register('image', {
              required: 'Image URL is required',
              pattern: {
                value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                message: 'Please enter a valid image URL'
              }
            })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Dynamic Specifications */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Product Specifications</h3>
          
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Inputfield
                placeholder="Specification Name"
                {...register(`specifications.${index}.name`)}
              />
              <Inputfield
                placeholder="Specification Value"
                {...register(`specifications.${index}.value`)}
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 text-white px-2"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            onClick={() => append({ name: '', value: '' })}
            className="bg-blue-500 text-white mt-2"
          >
            Add Specification
          </Button>
        </div>

        <div className="flex gap-4 mt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white"
          >
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </Button>
          
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white"
          >
            Cancel
          </Button>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <p className="text-green-500 mt-2">Updated Successfully!</p>
        )}
        
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </form>
    </div>
  )
}

export default EditProduct
