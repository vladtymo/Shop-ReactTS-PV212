import './App.css'
import AppLayout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import ProductTable from './components/ProductTable'
import ProductInfo from './components/ProductInfo'
import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<p>Home Page!</p>} />
        <Route path='/products' element={<ProductTable />} />
        <Route path='/products/:id' element={<ProductInfo />} />
        <Route path='/create' element={<CreateProduct />} />
        <Route path='/edit/:id' element={<EditProduct />} />
        <Route path='*' element={<p>Page Not Found!</p>} />
      </Route>
    </Routes>
  )
}

export default App
