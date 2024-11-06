import './App.css'
import AppLayout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import ProductTable from './components/ProductTable'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<p>Home Page!</p>} />
        <Route path='/products' element={<ProductTable />} />
        <Route path='*' element={<p>Page Not Found!</p>} />
      </Route>
    </Routes>
  )
}

export default App
