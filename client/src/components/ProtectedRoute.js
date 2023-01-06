import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {

    if(!localStorage.getItem('token')){
        console.log("Hola")
        return <Navigate to={"/"}/>
    }

    return <Outlet/>
}
