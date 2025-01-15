import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GuestRoute from './hooks/PublicRoute';
import Guest from './pages/Guest';
import Private from './pages/Private';
import Admin from './pages/Private/Admin';
import Home from './pages/Guest/Home';
import { FoundedCompany } from './pages/Guest/FoundedCompany';
import { Login } from './pages/Guest/Login';
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
      <Routes>
        <Route path="/" element={<GuestRoute />}>
          <Route path="/" element={<Guest />}>
            <Route index element={<Home />} />
            <Route path='/entidadesencontradas/:serviceId/:latitude/:longitude' element={<FoundedCompany />} />
            <Route path='/empresas/:companyId' element={<CompanyByID />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path="/" element={<Private />}>
          <Route path='/dashboard' element={<Admin />} />
        </Route>

      </Routes>
  )
}

export default App
