import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const LayoutPayment = () => {
  return (
    <div className='flex flex-col items-stretch w-full gap-6'>
       <div className='flex items-center gap-5 w-full justify-center'>
        <Link to='/paiements/primaire'>primaire</Link>
        <Link to='/paiements/college'>college</Link>
        <Link to='/paiements/lycee'>lycee</Link>
       </div>
        <Outlet/>
    </div>
  )
}

export default LayoutPayment