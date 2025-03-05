import { useState, FormEvent, useEffect, useContext } from "react";
import { ErrorResponse } from '../../App';
import { api } from '../../services/apiClient';
import { TrajetoProps } from "../../pages/Private/Utilizador";
import { HorarioPopup } from '../../components/HorarioPopup'
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export type HorarioProps = {
  id_horario: number,
  id_trajeto: number,
  data_hora: string,
  lugares_disponiveis: number,
  criacao: string,
  atualizacao: string
}

export default function SearchCard() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [trajetos, setTrajetos] = useState<TrajetoProps[]>([]);

  const [partidaSelecionada, setPartidaSelecionada] = useState("");
  const [destinoSelecionado, setDestinoSelecionado] = useState("");
  const [trajetoSelecionado, setTrajetoSelecionado] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [destinosFiltrados, setDestinosFiltrados] = useState<string[]>([]);
  const [isFocusedPartida, setIsFocusedPartida] = useState(false);
  const [isFocusedDestino, setIsFocusedDestino] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [horarios, setHorarios] = useState<HorarioProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchTrajetos = async () => {

      try {
        const response = await api.get('/trajetos');

        setTrajetos(response.data)

      } catch (error) {
        const err = error as ErrorResponse;

        if (err?.response?.data)
          toast.error(err.response.data.mensagem);
        else if (err?.response?.data?.statusCode)
          toast.error(err.response.data.mensagem);
        else
          toast.error("Falha na conexão de rede.");
      }
    };

    fetchTrajetos();
  }, []);


  // Criar lista única de partidas
  const partidasUnicas = Array.from(new Set(trajetos?.map((t) => t.partida)));

  // Atualiza destinos ao selecionar a partida
  const handlePartidaSelecionada = (partida: string) => {
    setPartidaSelecionada(partida);
    setDestinoSelecionado(""); // Resetar destino ao mudar a partida
    setIsFocusedPartida(false);

    // Filtrar destinos disponíveis para a partida selecionada
    setDestinosFiltrados(
      Array.from(new Set(trajetos.filter((t) => t.partida === partida).map((t) => t.destino)))
    );
  };

  const handleDestinoSelecionado = (destino: string) => {
    setDestinoSelecionado(destino);
    setIsFocusedDestino(false);
  };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    if (!partidaSelecionada || !destinoSelecionado || !date) {
      toast.error('Preencha todos os campos')
      return
    }

    const trajetoEncontrado = trajetos.find(
      (t) => t.partida === partidaSelecionada && t.destino === destinoSelecionado
    );

    if (!trajetoEncontrado?.id_trajeto) {
      toast.error("Trajeto não encontrado.");
      return;
    }

    try {
      setIsLoading(true);

      const formattedDate = new Date(date).toISOString().split("T")[0]; // Converte para YYYY-MM-DD
      setTrajetoSelecionado(trajetoEncontrado.id_trajeto)
      const response = await api.get(`/horarios-trajeto/${formattedDate}/${trajetoEncontrado.id_trajeto}`);

      setHorarios(response.data);
      setIsPopupOpen(true);

    } catch (error) {
      const err = error as ErrorResponse;

      if (err?.response?.data)
        toast.error(err.response.data.mensagem);
      else if (err?.response?.data?.statusCode)
        toast.error(err.response.data.mensagem);
      else
        toast.error("Falha na conexão de rede.");
    } finally {
      setIsLoading(false); // Encerra o carregamento em caso de erro
    }
  }

  const handleHorarioSelecionado = (horario: string) => {

    if (user?.token) {
      navigate(`reservas/nova/${trajetoSelecionado}/${date}/${horario}`)
    } else {
      navigate('/login');
      toast.success("Faça o login primeiro");
    }

    setIsPopupOpen(false);
  }


  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-4xl mx-auto -mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
          <div className="flex justify-center lg:items-center gap-6">
            <img
              src="/global-search.svg"
              alt="Logo da Jobs"
              className="w-[30px] h-8 md:h-8 md:w-[120px] lg:w-[50px] "
            />
            <div className="flex justify-start items-center gap-2 relative">
              <div className="grid gap-1">
                <label className="text-xs font-semibold">Local de Partida</label>
                <input
                  type="text"
                  placeholder='Onde estás?'
                  className="py-2 rounded-lg w-full bg-white text-sm focus:px-1"
                  value={partidaSelecionada}
                  onClick={() => setIsFocusedPartida(!isFocusedPartida)}
                  readOnly
                />
                {isFocusedPartida && (
                  <div className="absolute bg-white border rounded-md shadow-lg w-[10vw] mt-14 z-10">
                    {partidasUnicas.map((partida, index) => (
                      <p
                        key={index}
                        className="text-xs text-gray-700 p-2 hover:bg-gray-100 cursor-pointer"
                        onMouseDown={() => handlePartidaSelecionada(partida)}
                      >
                        {partida}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-start items-center gap-2 relative">
              <div className="grid gap-1">
                <label className="text-xs font-semibold">Local de Destino</label>
                <input
                  type="text"
                  placeholder='Onde quer ir?'
                  className="py-2 rounded-lg w-full bg-white text-sm focus:px-1"
                  value={destinoSelecionado}
                  onClick={() => setIsFocusedDestino(!isFocusedDestino)}
                  readOnly
                  disabled={!partidaSelecionada}
                />
                {isFocusedDestino && destinosFiltrados.length > 0 && (
                  <div className="absolute bg-white border rounded-md shadow-lg w-[10vw] mt-14 z-10">
                    {destinosFiltrados.map((destino, index) => (
                      <p
                        key={index}
                        className="text-xs text-gray-700 p-2 hover:bg-gray-100 cursor-pointer"
                        onMouseDown={() => handleDestinoSelecionado(destino)}
                      >
                        {destino}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <img
              src="/calendar-search.svg"
              alt="Logo da Jobs"
              className="w-[30px] h-8 md:h-8 md:w-[120px] lg:w-[50px] "
            />
            <div className="grid gap-1">
              <label className="text-xs font-semibold">Data de Partida</label>
              <input
                type="date"
                className="py-2 rounded-lg w-full bg-white text-sm focus:px-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <button onClick={handleSearch} className="font-semibold w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition">
            Buscar
          </button>
        </div>
      </div>

      {isPopupOpen &&
        <HorarioPopup
          handleHorarioSelecionado={handleHorarioSelecionado}
          horarios={horarios}
          onClose={() => setIsPopupOpen(false)}
        />
      }
    </>
  );
}
