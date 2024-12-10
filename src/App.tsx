import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guest from './pages/Guest';
import Home from './pages/Guest/Home';

export interface ErrorResponse {
  response?: {
    data?: {
      message: string
    }
  }
}

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Guest />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
