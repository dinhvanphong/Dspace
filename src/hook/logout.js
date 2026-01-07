import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axios.post('/rest/logout', null, {
        withCredentials: true // 🔥 BẮT BUỘC
      })
    } catch (error) {
      // có lỗi backend vẫn logout phía client
      console.error(error)
    } finally {
      navigate('/', { replace: true }) // quay về login
      window.location.reload() // 🔥 đảm bảo sạch state
    }
  }

  return logout
}

export default useLogout