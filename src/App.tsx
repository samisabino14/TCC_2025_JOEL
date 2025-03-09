import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import GuestRoute from './hooks/PublicRoute';
import Guest from './pages/Guest';
import Private from './pages/Private';
import Dashboard from './pages/Private/Dashboard';
import Admin from './pages/Private/Admin';
import Manager from './pages/Private/Manager';
import Utilizador from './pages/Private/Utilizador';
import Home from './pages/Guest/Home';
import { Login } from './pages/Guest/Login';
import { Register } from './pages/Guest/Register';
import NotFound from './pages/NotFound';
import { Nova } from './pages/Private/Utilizador/Reservas/Nova';
import { Rotas } from './pages/Private/Utilizador/Rotas';
import { Reservas } from './pages/Private/Utilizador/Reservas';
import { Usuarios } from './pages/Private/Dashboard/Usuarios';
import { Localidades } from './pages/Private/Dashboard/Localidades';
import { Pessoas } from './pages/Private/Dashboard/Pessoas';
import { TipoUsuario } from './pages/Private/Dashboard/TipoUsuario';
import { TiposFuncionarios } from './pages/Private/Dashboard/TiposFuncionarios';
import { Trajetos } from './pages/Private/Dashboard/Trajetos';
import { HorariosTrajeto } from './pages/Private/Dashboard/HorariosTrajeto';

export interface ErrorResponse {
  response?: {
    data?: {
      mensagem: string,
      statusCode: string
    }
  }
}

function App() {

  return (
    <>
      <Toaster
        position="top-right"
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
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<Register />} />

        </Route>

        {/* Rotas autenticadas */}
        <Route path="/dashboard" element={<Private />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path='/dashboard/administrador' element={<Admin />} />
            <Route path='/dashboard/administrador/usuarios' element={<Usuarios />} />
            <Route path='/dashboard/administrador/localidades' element={<Localidades />} />
            <Route path='/dashboard/administrador/pessoas' element={<Pessoas />} />
            <Route path='/dashboard/administrador/tipos-usuario' element={<TipoUsuario />} />
            <Route path='/dashboard/administrador/tipos-funcionario' element={<TiposFuncionarios />} />
            <Route path='/dashboard/administrador/trajetos' element={<Trajetos />} />
            <Route path='/dashboard/administrador/horarios-trajeto' element={<HorariosTrajeto />} />
            <Route path='/dashboard/gestor' element={<Manager />} />
          </Route>

          <Route path='/dashboard/utilizador' element={<Utilizador />} />

          <Route path="/dashboard" element={<Rotas />}>
            <Route path='/dashboard/utilizador/reservas' element={<Reservas />} />
            <Route path='/dashboard/utilizador/reservas/nova/:id_trajeto/:date/:horarioSelecionado' element={<Nova />} />
          </Route>

        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>

  )
}

export default App
