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
import { Nova } from './pages/Private/Utilizador/MinhasReservas/Nova';
import { Rotas } from './pages/Private/Utilizador/Rotas';
import { MinhasReservas } from './pages/Private/Utilizador/MinhasReservas';
import { Usuarios } from './pages/Private/Dashboard/Usuarios';
import { Localidades } from './pages/Private/Dashboard/Localidades';
import { Pessoas } from './pages/Private/Dashboard/Pessoas';
import { TipoUsuario } from './pages/Private/Dashboard/TipoUsuario';
import { TiposFuncionarios } from './pages/Private/Dashboard/TiposFuncionarios';
import { Funcionarios } from './pages/Private/Dashboard/Funcionarios';
import { Trajetos } from './pages/Private/Dashboard/Trajetos';
import { HorariosTrajeto } from './pages/Private/Dashboard/HorariosTrajeto';
import { Configuracoes } from './pages/Private/Dashboard/Configuracoes';
import { Reservas } from './pages/Private/Dashboard/Reservas';
import { Bonus } from './pages/Private/Dashboard/Bonus';
import { Promocoes } from './pages/Private/Dashboard/Promocoes';
import { TiposSuporte } from './pages/Private/Dashboard/TiposSuporte';
import { Suporte } from './pages/Private/Dashboard/Suporte';
import { Pagamentos } from './pages/Private/Dashboard/Pagamentos';
import Employee from './pages/Private/Employee';
import Profile from './pages/Private/Profile';
import { Empresas } from './pages/Private/Dashboard/Empresa';

export interface ErrorResponse {
  response?: {
    data?: {
      mensagem: string,
      erro: string,
      statusCode: string,
    },
    status: number
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
            <Route path='/dashboard/administrador/funcionarios' element={<Funcionarios />} />
            <Route path='/dashboard/administrador/tipos-funcionario' element={<TiposFuncionarios />} />
            <Route path='/dashboard/administrador/trajetos' element={<Trajetos />} />
            <Route path='/dashboard/administrador/bonus' element={<Bonus />} />
            <Route path='/dashboard/administrador/tipos-suporte' element={<TiposSuporte />} />
            <Route path='/dashboard/administrador/empresas' element={<Empresas />} />
            <Route path='/dashboard/administrador/pagamentos' element={<Pagamentos />} />
            <Route path='/dashboard/administrador/promocoes' element={<Promocoes />} />
            <Route path='/dashboard/administrador/horarios-trajeto' element={<HorariosTrajeto />} />
            <Route path='/dashboard/administrador/reservas' element={<Reservas />} />
            <Route path='/dashboard/administrador/configuracoes' element={<Configuracoes />} />
            <Route path='/dashboard/funcionario' element={<Employee />} />
            <Route path='/dashboard/funcionario/perfil' element={<Profile />} />
            
          </Route>

          <Route path='/dashboard/utilizador' element={<Utilizador />} />

          <Route path="/dashboard" element={<Rotas />}>
            <Route path='/dashboard/utilizador/reservas' element={<MinhasReservas />} />
            <Route path='/dashboard/utilizador/reservas/nova/:id_trajeto_empresa_selecionado/:id_horario/:id_empresa' element={<Nova />} />
          </Route>

        </Route>

        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>

  )
}

export default App
