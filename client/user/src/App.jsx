import './App.css'
import CheckOut from './pages/CheckOut'
import UserMenu from './pages/UserMenu'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Success from './pages/succesPage/Success';

function App() {

  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path='/' element={<UserMenu />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
