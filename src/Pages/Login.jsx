
import React, { useState } from 'react'
import axios from 'axios'

import {API_ROOT} from '../utils/conStants.js'
const Login = () => {
  const [formData, setFormData] = useState({
    email: 'tuyendv@hpu.edu.vn',
    password: '123654'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [token, setToken] = useState('');
  const [useProxy, setUseProxy] = useState(false);

  const proxyUrl = 'https://api.allorigins.win/raw?url='
  const apiUrl = encodeURIComponent('rest/login')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Axios tự động parse JSON, không cần .json()
      const formDataToSend = new FormData()
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)

      const response = await axios.post(proxyUrl + apiUrl, formDataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // const response = await axios.post(`${API_ROOT}/login`, {
      //   email: formData.email,
      //   password: formData.password
      // }, {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })

      // Với axios, data nằm trong response.data
      const data = response
      console.log('Response data:', data)
      // if (data.status === 200 || data.status === 204) {
      //   // Lấy token từ header
      //   const authToken = data.headers['authorization'] || 
      //                     data.headers['dspace-xsrf-token'] ||
      //                     data.headers['x-xsrf-token'] ||
      //                     data.data;

      //   if (authToken) {
      //     setToken(authToken);
      //     setSuccess(true);
      //     setError('');
      //   } else {
      //     // Nếu không có token, có thể là cookie-based
      //     setSuccess(true);
      //     setToken('Token saved in cookies (check browser DevTools)');
      //     setError('');
      //   }
      // } else {
      //   setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      // }

      if (data.token) {
        // Lưu token vào localStorage
        localStorage.setItem('authToken', data.token)
        // Lưu thêm user info nếu có
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user))
        }
        setSuccess(true)
        setTimeout(() => {
          alert(`Đăng nhập thành công!\nToken: ${data.token.substring(0, 20)}...`)
          // Chuyển hướng đến trang dashboard
          // window.location.href = '/dashboard'
          // hoặc dùng React Router: navigate('/dashboard')
        }, 500)
      } else {
        setError('Không nhận được token từ server')
      }
    } catch (err) {
      // Xử lý lỗi từ axios
      if (err.response) {
        // Server trả về lỗi
        setError(err.response.data.message || 'Email hoặc mật khẩu không đúng')
      } else if (err.request) {
        // Lỗi CORS hoặc không kết nối được
        setError('Không thể kết nối đến server. Vui lòng kiểm tra CORS hoặc kết nối mạng')
      } else {
        setError('Có lỗi xảy ra: ' + err.message)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Đăng Nhập
        </h2>

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            Đăng nhập thành công! 🎉
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login