import React, { useEffect } from 'react'
import Head from 'next/head'
import { Helmet } from 'react-helmet'


const Landingpagelayout = ({ children }) => {
  const Add =()=>{
  document.querySelector("body").classList.add("app", "sidebar-mini", "ltr", "landing-page", "horizontalmenu")
  }
  useEffect(() => {
    Add()
  },[])
  return (
    <div>
      {/* <Helmet>
        <body className="app sidebar-mini ltr landing-page horizontalmenu"></body>
        </Helmet> */}
      { children }
      </div>
  )
}

export default Landingpagelayout