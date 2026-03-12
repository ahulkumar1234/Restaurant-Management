import './App.css'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tables from './pages/Tables'
import Orders from './pages/Orders'
import Menu from './pages/Menu'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/tables' element={<Tables />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/menu' element={<Menu />} />
      </Routes>
    </Router>
  )
}

export default App
