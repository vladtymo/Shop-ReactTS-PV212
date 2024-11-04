import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Layout } from 'antd'
import AppLayout from './components/Layout'

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <AppLayout />
    </>
  )
}

export default App
