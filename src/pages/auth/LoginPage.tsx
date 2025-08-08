import { useState } from 'react'
import InPuts from '../../components/InPuts'
import { useNavigate } from 'react-router-dom'
import { useCheckLoggedIn } from '../../hooks/useCheckLoggedIn'

export default function Login() {
  const navigate = useNavigate()
  const {user, setIsLoggedIn } = useCheckLoggedIn()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
 const handleSubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault()
  
  const formErrors: { email?: string; password?: string } = {}
  if (!formData.email) {
    formErrors.email = 'Email is required'
  }
  if (!formData.password) {
    formErrors.password = 'Password is required'
  }
  
  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors)
    return
  }
  
  const foundUser = user.find(
    user => user.email === formData.email 
    && user.password === formData.password
  )
  
  if (foundUser) {
    localStorage.setItem('currentUser', JSON.stringify({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email
    }));
    
    setIsLoggedIn(true);
    
    setFormData({
      email: '',
      password: ''
    });
    setErrors({});
    
    navigate('/dashboard');
  } else {
    alert('user not found or invalid credentials')
    setIsLoggedIn(false);
  }
}

  return (
    <div className='flex flex-col lg:flex-row min-h-screen'>
      <div className='flex lg:w-1/2 bg-purple-400 items-center justify-center p-4 lg:p-8 min-h-[30vh] lg:min-h-screen rounded-tl-2xl rounded-bl-2xl'>
        <div className='text-center text-white'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 lg:mb-4'>Welcome to iHUZA</h1>
          <p className='text-base sm:text-lg lg:text-xl text-primary-200'>Inventory Management System</p>
        </div>
      </div>
      
      <div className='flex-1 lg:w-1/2 bg-primary-200 dark:bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8'>
        <div className='w-full max-w-sm sm:max-w-md'>
          <h2 className='text-xl sm:text-2xl font-bold mb-4 lg:mb-6 text-primary-50 dark:text-white text-center'>Please Login!!</h2>
          <form onSubmit={handleSubmit} className=' dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl border border-gray-300 dark:border-gray-600'>
            
            <div className='mb-4'>
              <InPuts
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full ${errors.email ? 'border-red-500' : 'border-primary-300'}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.email}</p>}
            </div>

            <div className='mb-6'>
              <InPuts
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className={`w-full ${errors.password ? 'border-red-500' : 'border-primary-300'}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className='text-red-500 text-xs sm:text-sm mt-1'>{errors.password}</p>}
            </div>

            <button 
              type="submit" 
              className='w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 sm:py-3 px-4 rounded-md transition-colors duration-200 font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
            >
              Login
            </button>

            <div className='mt-4 text-center'>
              <a href="#" className='text-xs sm:text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'>
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}