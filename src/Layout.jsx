import React from 'react'
import { Navbar } from './components'
import { Outlet } from 'react-router-dom'

const Layout = ({setName}) => {
  console.log(setName)
  return (
    <div>
        <Navbar setName={setName}/>
        <Outlet/>
    </div>
  )
}

export default Layout