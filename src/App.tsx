import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import GuestRoute from './hooks/PublicRoute';
import Guest from './pages/Guest';
import Private from './pages/Private';
import Admin from './pages/Private/Admin';
import Manager from './pages/Private/Manager';
import Company from './pages/Private/Company';
import Home from './pages/Guest/Home';
import { FoundedCompany } from './pages/Guest/FoundedCompany';
import { Login } from './pages/Guest/Login';
import NotFound from './pages/NotFound';
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
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          duration: 5000, // Duração padrão de 5 segundos
        }}
      />
      <Routes>

        {/* Rotas públicas */}
        <Route path="/" element={<GuestRoute />}>
          <Route path="/" element={<Guest />}>
            <Route index element={<Home />} />
            <Route path='/entidadesencontradas/:serviceId/:latitude/:longitude' element={<FoundedCompany />} />
            <Route path='/empresas/:companyId' element={<CompanyByID />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Route>

        {/* Rotas autenticadas */}
        <Route path="/dashboard" element={<Private />}>
          <Route path='/dashboard/administrador' element={<Admin />} />
          <Route path='/dashboard/gestor' element={<Manager />} />
          <Route path='/dashboard/empresa' element={< Company />} />
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>

  )
}

export default App
