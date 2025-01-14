import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guest from './pages/Guest';
import Home from './pages/Guest/Home';
import { FoundedCompany } from './pages/Guest/FoundedCompany';
import { CompanyByID } from './pages/Guest/CompanyByID';

export interface ErrorResponse {
  response?: {
    data?: {
      message: string,
      statusCode: string
    }
  }
}

function App() {
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Guest />}>
          <Route index element={<Home />} />
          <Route path='/entidadesencontradas/:serviceId/:latitude/:longitude' element={<FoundedCompany />} />
          <Route path='/empresas/:companyId' element={<CompanyByID />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
