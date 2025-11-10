import React, { useState } from 'react'
import { Eye, EyeOff, User, Lock } from 'lucide-react' 
import Image from 'next/image'
import { useRouter } from 'next/router'

function Login() {
  const [formData, setFormData] = useState({
    agentId: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/Login/loginapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId: formData.agentId,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the user's name to the browser's storage
        localStorage.setItem('agentName', data.name);

        console.log('Login successful');
        // Redirect to Dashboard.js
        router.push('/Dashboard') 
      } else {
        setError(data.message || 'Login failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login request error:', error)
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        <div className="w-full max-w-md">
          
          {/* Logo */}
          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 flex items-center justify-center">
              <div className="relative w-20 h-20">
                <Image
                  src="/Log.png"
                  alt="Company Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* Header Text */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Agent ID Field */}
              <div className="space-y-3">
                <label htmlFor="agentId" className="block text-sm font-medium text-gray-700">
                  Agent ID 
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[#028bcc]" />
                  </div>
                  <input
                    id="agentId"
                    name="agentId"
                    type="text"
                    required
                    value={formData.agentId}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#028bcc] focus:border-[#028bcc] transition-all duration-200 bg-gray-50"
                    placeholder="Enter your Agent ID"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm text-[#028bcc] hover:text-[#0278b3] font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#028bcc]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#028bcc] focus:border-[#028bcc] transition-all duration-200 bg-gray-50"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-[#028bcc]" />
                    ) : (
                      <Eye className="h-5 w-5 text-[#028bcc]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#028bcc] focus:ring-[#028bcc] border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              {/* Error Message Display */}
              {error && (
                <p className="text-sm text-red-600 text-center">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#028bcc] text-white py-4 px-4 rounded-xl font-semibold shadow-lg hover:bg-[#0278b3] transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#028bcc] disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login