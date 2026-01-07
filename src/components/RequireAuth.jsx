import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';


const RequireAuth = ({ children }) => {
  const notify = () => toast.success('Đăng nhập thành công!', {
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    // transition: Bounce,
  });
  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/rest/status', {
          withCredentials: true // 🔥 BẮT BUỘC
        })
        console.log(res)
        setAuth(res.data.authenticated === true)
      } catch (error) {
        setAuth(false)
      } finally {
        // notify();
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return <div>Checking login...</div>

  return auth ? children : <Navigate to="/" replace />
}

export default RequireAuth

// import { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom'
// import axios from 'axios'

// const RequireAuth = ({ children }) => {
//   const [loading, setLoading] = useState(true)
//   const [isAuth, setIsAuth] = useState(false)

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get('/rest/status', {
//           // withCredentials: true
//           credentials: 'include'
//         })
//         setIsAuth(res.data.authenticated === true)
//       } catch {
//         setIsAuth(false)
//       } finally {
//         setLoading(false)
//       }
//     }
//     checkAuth()
//   }, [])

//   if (loading) {
//     return <div className="p-8 text-center">🔄 Đang kiểm tra đăng nhập...</div>
//   }

//   {!isAuth ? <Navigate to="/" replace /> : children}

//   // return isAuth ? children : <Navigate to="/" replace />
// }

// export default RequireAuth


// import { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom'

// const RequireAuth = ({ children }) => {
//   const [loading, setLoading] = useState(true)
//   const [auth, setAuth] = useState(false)

//   useEffect(() => {
//     fetch('/rest/status', {
//       credentials: 'include'
//     })
//       .then(res => res.json())
//       .then(data => {
//         setAuth(data.authenticated === true)
//         setLoading(false)
//       })
//       .catch(() => setLoading(false))
//   }, [])

//   if (loading) return <div>Checking login...</div>

//   return auth ? children : <Navigate to="/" replace />
// }

// export default RequireAuth