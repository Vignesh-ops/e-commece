import { useEffect, useState } from "react"
import { api2 } from '../services/api'
import { useCart } from "../context/cartContext"
import { useDispatch } from "react-redux"
import { addToCart, fetchCartData } from "../features/cartSlice"
import { useForm, useWatch } from "react-hook-form"
import Button from "../app/ui/Button"
import Inputfield from '../app/ui/Inputfield'

const Home = () => {
  const [allproducts, setallProducts] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // Dynamic filter form
  const { register, control, reset } = useForm({
    defaultValues: {
      search: '',
      minPrice: '',
      maxPrice: '',
      sortBy: ''
    }
  })

  // Watch form values for real-time filtering
  const watchedValues = useWatch({ control })

  useEffect(() => {
    dispatch(fetchCartData())
    api2.get("products").then((res) => {
      setallProducts(res.data)
      setProducts(res.data)
      setLoading(false)
    })
  }, [])

  // Apply filters whenever form values change
  useEffect(() => {
    let filtered = [...allproducts]

    // Search filter
    if (watchedValues.search) {
        console.log('search',watchedValues.search)
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(watchedValues.search.toLowerCase())
      )
    }

    // Price range filter
    if (watchedValues.minPrice) {
        console.log('minPrice',watchedValues)

      filtered = filtered.filter((product) =>
        parseFloat(product.price) >= parseFloat(watchedValues.minPrice)
      )
    }

    if (watchedValues.maxPrice) {
      filtered = filtered.filter((product) =>
        parseFloat(product.price) <= parseFloat(watchedValues.maxPrice)
      )
    }

    // Sorting
    if (watchedValues.sortBy === 'low to high') {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (watchedValues.sortBy === 'high to low') {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    } else if (watchedValues.sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    setProducts(filtered)
  }, [watchedValues, allproducts])

  const clearFilters = () => {
    reset()
  }

  return (
    <>
      {/* Dynamic Filter Form */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="text-lg text-gray-600 font-semibold mb-3">Filter Products</h3>
        
        <div className="text-gray-600 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Inputfield
              placeholder="Search products..."
              type="search"
              {...register('search')}
            />
          </div>

          <div>
            <Inputfield
              placeholder="Min Price"
              type="number"
              step="0.01"
              {...register('minPrice')}
            />
          </div>

          <div>
            <Inputfield
              placeholder="Max Price"
              type="number"
              step="0.01"
              {...register('maxPrice')}
            />
          </div>

          <div>
            <select
              className="w-full p-2 border rounded"
              {...register('sortBy')}
            >
              <option value="">Sort by</option>
              <option value="low to high">Price: Low to High</option>
              <option value="high to low">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <Button onClick={clearFilters} className="bg-gray-500 text-white">
            Clear Filters
          </Button>
          <span className="ml-4 text-sm text-gray-600">
            Showing {products.length} of {allproducts.length} products
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="prod-container">
        {products?.map((product) => (
          <div key={product.id} className="prod-container__items">
            <div className="prod-container__image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="prod-container__itemname">
              {product.title}
            </div>
            <div className="prod-container__itemprice">
              Price: ${product.price}
            </div>
            
            {/* Display specifications if available */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="text-sm text-gray-600 mt-2">
                {product.specifications.map((spec, index) => (
                  <div key={index}>
                    <strong>{spec.name}:</strong> {spec.value}
                  </div>
                ))}
              </div>
            )}
            
            <div className="prod-container__buysection flex justify-center gap-2">
              <Button className="text-sm">Buy Now</Button>
              <Button 
                className="text-sm"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
        
        {loading && <p>Loading...</p>}
        {!loading && products.length === 0 && (
          <p className="text-center col-span-full">No products found matching your criteria.</p>
        )}
      </div>
    </>
  )
}

export default Home
