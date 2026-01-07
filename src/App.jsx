
import './App.css'
import React, {useState} from 'react'

import { Navigate, Outlet, Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react'

import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import Footer from './components/Footer'
import SideBar from './components/SideBar'
import RequireAuth from './components/RequireAuth.jsx'
function App() {
  const MainLayoutHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // const handleOpenSidebar = () => {
    //   setIsSidebarOpen(!isSidebarOpen);
    // }
    return (
      <div className="">
        <div className="flex h-screen bg-gray-50">
          <div className='h-screen'>
            <SideBar isSidebarOpen={isSidebarOpen} />
          </div>
          <Suspense fallback={<p>Loading...</p>} >
            <Outlet context={{ isSidebarOpen, setIsSidebarOpen }}/>
          </Suspense>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/' element={<MainLayoutHome/>}>
          <Route path='home' element={<RequireAuth><Home/></RequireAuth>}/>
        </Route>

      </Routes>
      {/* <Login /> */}
    </>
  )
}

export default App
