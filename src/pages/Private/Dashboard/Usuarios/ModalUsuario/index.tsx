import React, { useState, useEffect } from "react";
import { UsuarioProps } from "..";


type ModalProps = {
  usuario: UsuarioProps | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (usuarioAtualizado: UsuarioProps) => void;
};

export const ModalUsuario: React.FC<ModalProps> = ({ usuario, isOpen, onClose, onSave }) => {
  const [dadosUsuario, setDadosUsuario] = useState<UsuarioProps | null>(usuario);

  useEffect(() => {
    setDadosUsuario(usuario);
  }, [usuario]);

  if (!isOpen || !dadosUsuario) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDadosUsuario({ ...dadosUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(dadosUsuario);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>
        <div className="space-y-3">
          <label className="block">
            <span className="text-gray-700">Nome Completo</span>
            <input
              type="text"
              name="nome"
              value={dadosUsuario.nome}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">E-mail</span>
            <input
              type="email"
              name="email"
              value={dadosUsuario.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Telefone</span>
            <input
              type="text"
              name="telefone"
              value={dadosUsuario.telefone}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Gênero</span>
            <select
              name="genero"
              value={dadosUsuario.genero}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </label>

          <label className="block">
            <span className="text-gray-700">Data de Nascimento</span>
            <input
              type="date"
              name="data_nascimento"
              value={dadosUsuario.data_nascimento.split("T")[0]}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Tipo de Usuário</span>
            <select
              name="tipo_usuario"
              value={dadosUsuario.tipo_usuario}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="Usuário">Usuário</option>
              <option value="Gestor">Gestor</option>
              <option value="Administrador">Administrador</option>
            </select>
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
