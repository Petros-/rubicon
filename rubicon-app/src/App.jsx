import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListOfThings from './ListOfThings'
import TopNav from './TopNav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home'
import ThingDetail from './ThingDetail'
import NewThing from './NewThing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thing/:id" element={<ThingDetail />} />
        <Route path="/new" element={<NewThing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
