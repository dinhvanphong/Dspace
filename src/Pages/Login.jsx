
import React, { useState } from 'react'
import axios from 'axios'

import {API_ROOT} from '../utils/conStants.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: 'tuyendv@hpu.edu.vn',
    password: '123654'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Tạo form-urlencoded body
      const formBody = new URLSearchParams();
      formBody.append('email', formData.email);
      formBody.append('password', formData.password);

      const response = await fetch('/rest/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString(),
        credentials: 'include' // Quan trọng!
      });

      console.log('Status:', response);

      if (response.status === 200 || response.status === 204) {
          navigate('/home') // hoặc '/'

        // setSuccess(true)

        // // 🔍 (khuyến nghị) kiểm tra trạng thái login
        // const statusRes = await fetch('/rest/status', {
        //   credentials: 'include'
        // })
        // console.log(statusRes)
        // if (statusRes.ok) {
        //   // ✅ Đăng nhập thật sự thành công → chuyển trang
        //   navigate('/home') // hoặc '/'
        // } else {
        //   setError('Login chưa hoàn tất (session chưa được tạo)')
        // }
      } else if (response.status === 401) {
        setError('Email hoặc password không đúng!');
      }

    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Đăng Nhập DSpace
        </h2>

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <div className="font-semibold mb-2">✅ Đăng nhập thành công!</div>

          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            ❌ {error}
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
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang đăng nhập...
              </span>
            ) : (
              'Đăng Nhập'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;