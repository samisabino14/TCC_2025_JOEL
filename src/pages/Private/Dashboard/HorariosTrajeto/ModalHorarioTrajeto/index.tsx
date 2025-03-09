import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../../services/apiClient";

type TrajetoProps = {
  id_trajeto: number;
  id_partida: number;
  id_destino: number;
  partida: string;
  destino: number;
  lotacao: number;
  preco: number;
};

type HorarioProps = {
  id_horario?: number;
  id_trajeto: number;
  data_hora: string;
  lugares_disponiveis: number;
};

type ModalHorarioTrajetoProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (horario: HorarioProps) => void;
};

export const ModalHorarioTrajeto: React.FC<ModalHorarioTrajetoProps> = ({ isOpen, onClose, onSave }) => {
  const [horario, setHorario] = useState<HorarioProps>({
    id_trajeto: 0,
    data_hora: "",
    lugares_disponiveis: 0,
  });

  const [trajetos, setTrajetos] = useState<TrajetoProps[]>([]);

  // Buscar trajetos ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      fetchTrajetos();
    }
  }, [isOpen]);

  const fetchTrajetos = async () => {
    try {
      const response = await api.get("/trajetos");
      setTrajetos(response.data);
    } catch (error) {
      toast.error("Erro ao carregar os trajetos.");
    }
  };

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setHorario({ ...horario, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!horario.id_trajeto || !horario.data_hora || !horario.lugares_disponiveis) {
      toast.error("Preencha todos os campos!");
      return;
    }
    onSave(horario);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Novo Horário</h2>
        <div className="space-y-3">
          {/* Campo para escolher o trajeto */}
          <label className="block">
            <span className="text-gray-700">Trajeto</span>
            <select
              name="id_trajeto"
              value={horario.id_trajeto}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="">Selecione um trajeto</option>
              {trajetos.map((trajeto) => (
                <option key={trajeto.id_trajeto} value={trajeto.id_trajeto}>
                  {`${trajeto.partida} → ${trajeto.destino}`}
                </option>
              ))}
            </select>
          </label>

          {/* Campo para a data e hora */}
          <label className="block">
            <span className="text-gray-700">Data e Hora</span>
            <input
              type="datetime-local"
              name="data_hora"
              value={horario.data_hora}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          {/* Campo para os lugares disponíveis */}
          <label className="block">
            <span className="text-gray-700">Lugares Disponíveis</span>
            <input
              type="number"
              name="lugares_disponiveis"
              value={horario.lugares_disponiveis}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};
