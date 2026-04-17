import React from 'react'
import Header from './components/Header'
import About from './components/About'
import AsiFunciona from './components/AsiFunciona'
import Experiencias from './components/Experiencias'
import Contacto from './components/Contacto'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header/>
      <About/>
      <AsiFunciona/>
      <Experiencias/>
      <Contacto/>
      <ToastContainer/>
      <Footer/>
    </div>
  )
}

export default App
